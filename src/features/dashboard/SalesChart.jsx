import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", total: 480, extraSales: 20 },
  { label: "Jan 10", total: 580, extraSales: 100 },
  { label: "Jan 11", total: 550, extraSales: 150 },
  { label: "Jan 12", total: 600, extraSales: 50 },
  { label: "Jan 13", total: 700, extraSales: 150 },
  { label: "Jan 14", total: 800, extraSales: 150 },
  { label: "Jan 15", total: 700, extraSales: 200 },
  { label: "Jan 16", total: 650, extraSales: 200 },
  { label: "Jan 17", total: 600, extraSales: 300 },
  { label: "Jan 18", total: 550, extraSales: 100 },
  { label: "Jan 19", total: 700, extraSales: 100 },
  { label: "Jan 20", total: 800, extraSales: 200 },
  { label: "Jan 21", total: 700, extraSales: 100 },
  { label: "Jan 22", total: 810, extraSales: 50 },
  { label: "Jan 23", total: 950, extraSales: 250 },
  { label: "Jan 24", total: 970, extraSales: 100 },
  { label: "Jan 25", total: 900, extraSales: 200 },
  { label: "Jan 26", total: 950, extraSales: 300 },
  { label: "Jan 27", total: 850, extraSales: 200 },
  { label: "Jan 28", total: 900, extraSales: 100 },
  { label: "Jan 29", total: 800, extraSales: 300 },
  { label: "Jan 30", total: 950, extraSales: 200 },
  { label: "Jan 31", total: 1100, extraSales: 300 },
  { label: "Feb 01", total: 1200, extraSales: 400 },
  { label: "Feb 02", total: 1250, extraSales: 300 },
  { label: "Feb 03", total: 1400, extraSales: 450 },
  { label: "Feb 04", total: 1500, extraSales: 500 },
  { label: "Feb 05", total: 1400, extraSales: 600 },
  { label: "Feb 06", total: 1450, extraSales: 400 },
];

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      total: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.total, 0),
      extraSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        total: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        total: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="total"
            type="monotone"
            stroke={colors.total.stroke}
            fill={colors.total.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extraSales"
            type="monotone"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
            strokeWidth={2}
            name="Extra sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
