import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AverageTable = () => {
  const dataArray = [
    {
      source: "APR displayed by Fluid",
      percentage: "5%",
      interest: "13 eth",
    },
    {
      source: "APR calculated (actual)",
      percentage: "2%",
      interest: "9 eth",
    },
  ];

  return (
    <Table>
      <TableCaption>Aggregated APR Differences</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Source</TableHead>
          <TableHead>Average Percentage</TableHead>
          <TableHead>Total interest</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataArray.map((row) => (
          <TableRow key={row.source}>
            <TableCell className="font-medium">{row.source}</TableCell>
            <TableCell className="text-center">{row.percentage}</TableCell>
            <TableCell className="text-center">{row.interest}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Missing Income</TableCell>
          <TableCell className="text-right">4 eth</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
