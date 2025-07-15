import { ApexTitleSubtitle, ApexChart, ApexLegend, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export function applyChartTheme(
    getTheme: () => 'light' | 'dark',
    chart: ApexChart,
    title: ApexTitleSubtitle,
    legend: ApexLegend,
    seriesCount: number,
    xaxis?: ApexXAxis,
    yaxis?: ApexYAxis
) {
    const theme = getTheme();
    const fontColor = theme === "dark" ? "#fff" : "000";
    const backgroundColor = theme === "dark" ? "#1e1e2f" : "fff";
    const axisColor = theme === 'dark' ? '#999' : '#666';

    chart.background = backgroundColor;

    xaxis!.labels = {
        style: {
            colors: new Array(12).fill(fontColor)
        }
    }

    yaxis!.labels = { style: { colors: new Array(12).fill(fontColor) }}
    yaxis!.axisBorder = { show: true, color: axisColor }
    yaxis!.axisTicks = { show: true, color: axisColor }

    title!.style!.color = fontColor;
    legend.labels = { colors: new Array(seriesCount).fill(fontColor) }
}