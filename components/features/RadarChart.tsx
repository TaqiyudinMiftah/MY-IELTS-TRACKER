'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CategoryStats } from '@/types';

interface RadarChartProps {
  stats: CategoryStats;
}

export default function RadarChart({ stats }: RadarChartProps) {
  const data = [
    { skill: 'Listening', value: stats.listening },
    { skill: 'Reading', value: stats.reading },
    { skill: 'Writing', value: stats.writing },
    { skill: 'Speaking', value: stats.speaking },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsRadar data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Hours" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RechartsRadar>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
