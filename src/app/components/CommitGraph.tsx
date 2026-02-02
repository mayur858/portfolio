"use client";

import React, { useEffect, useState } from "react";
import {
  ActivityCalendar,
  Activity,
  BlockElement,
} from "react-activity-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/app/context/DarkModeContext";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: {
    [year: string]: number;
  };
  contributions: Contribution[];
}

const CommitGraph = () => {
  const { isDarkMode } = useDarkMode();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [blockSize, setBlockSize] = useState(12);
  const [blockMargin, setBlockMargin] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBlockSize(9);
        setBlockMargin(2);
      } else {
        setBlockSize(12);
        setBlockMargin(4);
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/mayur858",
        );
        const data: ApiResponse = await response.json();

        // Filter for the last 365 days or just take the raw list if it's already structured well
        // The API returns distinct contribution objects. We can just use the last year's worth.
        // Or simply pass the data as is if the component handles it.
        // react-activity-calendar expects an array of {date, count, level}.

        // Use the total object to calculate lifetime commits
        const lifetimeTotal = Object.values(data.total).reduce(
          (a, b) => a + b,
          0,
        );
        setTotalCommits(lifetimeTotal);

        // User requested "all contribution till date", so we pass all filtering.
        // If this becomes too wide, the overflow-x-auto on the container will handle it.
        setContributions(data.contributions);
      } catch (error) {
        console.error("Failed to fetch github data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-8">
          <div className="animate-pulse h-32 w-full bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mt-8 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          GitHub Contributions
        </CardTitle>
        <span className="text-sm text-muted-foreground">
          {totalCommits} lifetime contributions
        </span>
      </CardHeader>
      <CardContent className="flex justify-center pb-6 overflow-x-auto scrollbar-subtle">
        <ActivityCalendar
          data={contributions}
          theme={{
            light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
            dark: ["#27272a", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
          colorScheme={isDarkMode ? "dark" : "light"}
          blockSize={blockSize}
          blockMargin={blockMargin}
          renderBlock={(block: BlockElement, activity: Activity) => {
            return React.cloneElement(block, {
              "data-tooltip-id": "github-tooltip",
              "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
            });
          }}
        />
        <ReactTooltip id="github-tooltip" place="top" />
      </CardContent>
    </Card>
  );
};

export default CommitGraph;
