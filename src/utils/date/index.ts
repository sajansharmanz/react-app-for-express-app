import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    format,
} from "date-fns";

export const generatePostedDatetime = (postCreatedAt: string): string => {
    if (process.env.REACT_APP_DB_TIMEZONE === undefined) {
        throw new Error("No DB Timezone set");
    }

    const createdAt = zonedTimeToUtc(
        postCreatedAt,
        `${process.env.REACT_APP_DB_TIMEZONE}`
    );
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = utcToZonedTime(createdAt, timezone);
    const currentDate = new Date();

    const diffInSeconds = differenceInSeconds(currentDate, zonedDate);
    if (diffInSeconds <= 59) {
        return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    }

    const diffInMins = differenceInMinutes(currentDate, zonedDate);
    if (diffInMins <= 59) {
        return `${diffInMins} minute${diffInMins > 1 ? "s" : ""} ago`;
    }

    const diffInHours = differenceInHours(currentDate, zonedDate);
    if (diffInHours < 24) {
        if (diffInHours < 12) {
            return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
        } else {
            return `Today at ${format(zonedDate, "hh:mma")}`;
        }
    }

    const diffInDays = differenceInDays(currentDate, zonedDate);
    if (diffInDays < 2) {
        return `Yesterday at ${format(zonedDate, "hh:mma")}`;
    }

    return `${format(zonedDate, "ii MMM yyyy")} at ${format(
        zonedDate,
        "hh:mma"
    )}`;
};
