type TransactionsResponse = {
  deposit: number;
  ethUsd: number | null;
  transactions: unknown[];
};

export async function POST(req: Request) {
  let wallet = "";
  try {
    const body = await req.json();
    wallet = typeof body?.wallet === "string" ? body.wallet.trim() : "";
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (!wallet) {
    return new Response("Missing wallet", { status: 400 });
  }

  // Visible in Vercel logs
  console.log("fetchTransactions wallet:", wallet);

  try {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const res1 = await fetch(
      `https://api.instadapp.io/v2/mainnet/lite/users/${wallet}/vaults`,
    );

    if (!res1.ok) {
      return new Response("Upstream error (vaults)", { status: 502 });
    }

    const userData = await res1.json();
    const deposit = Number.parseFloat(userData?.[0]?.userSupplyAmount ?? "0");

    const params = new URLSearchParams({
      "types[]": "profit",
      from_date: oneYearAgo.toISOString(),
      to_date: now.toISOString(),
      user_address: wallet,
      per_page: "365",
      page: "1",
    });

    const res2 = await fetch(
      `https://lite.api.instadapp.io/mainnet/transaction-actions?${params}`,
    );

    if (!res2.ok) {
      return new Response("Upstream error (transactions)", { status: 502 });
    }

    const result = await res2.json();

    const priceRes = await fetch(
      "https://api.kraken.com/0/public/Ticker?pair=ethusd",
    );

    const priceData = priceRes.ok ? await priceRes.json() : null;
    const priceResult = priceData?.result;
    const priceKey =
      priceResult && typeof priceResult === "object"
        ? Object.keys(priceResult)[0]
        : null;
    const ethUsdRaw = priceKey ? priceResult?.[priceKey]?.c?.[0] : null;
    const ethUsd = Number.isFinite(Number.parseFloat(ethUsdRaw))
      ? Number.parseFloat(ethUsdRaw)
      : null;

    const payload: TransactionsResponse = {
      deposit,
      ethUsd,
      transactions: result?.data ?? [],
    };

    return Response.json(payload);
  } catch (err) {
    console.error("fetchTransactions error:", err);
    return new Response("Server error", { status: 500 });
  }
}
