"use client";
import { GraphData } from "@/actions/get-graph-revenue";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface OverviewProps {
    data: GraphData[];
}
const Overview : React.FC<OverviewProps> = ({
    data
}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `Rs${value}`}
                />
                <Bar dataKey="total" fill="hsl(0 72.2% 50.6%)" radius={[4,4,0,0]} />  
            </BarChart>
        </ResponsiveContainer>
     );
}
 
export default Overview;