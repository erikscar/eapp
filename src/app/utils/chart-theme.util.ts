import {
  ApexTitleSubtitle,
  ApexChart,
  ApexLegend,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export function applyChartTheme(
  getTheme: () => 'light' | 'dark',
  title: ApexTitleSubtitle,
  legend: ApexLegend,
  seriesCount: number,
  xaxis?: ApexXAxis,
  yaxis?: ApexYAxis
) {
  const theme = getTheme();
  const fontColor = theme === 'dark' ? '#fff' : '000';
  const axisColor = theme === 'dark' ? '#999' : '#666';

  xaxis!.labels = {
    style: {
      colors: new Array(12).fill(fontColor),
    },
  };

  yaxis!.labels = { style: { colors: new Array(12).fill(fontColor) } };
  yaxis!.axisBorder = { show: true, color: axisColor };
  yaxis!.axisTicks = { show: true, color: axisColor };
  yaxis!.title = { text: "Quantidade", style: { color: fontColor, fontSize: '14px', fontWeight: '600', fontFamily: 'Poppins' } };
  title!.style!.color = fontColor;
  legend.labels = { colors: new Array(seriesCount).fill(fontColor) };
}
