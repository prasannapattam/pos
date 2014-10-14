using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pos.Lib.Shared
{
    public static class PosUtil
    {
        public static string GetPatientAge(DateTime? dob)
        {
            if (!dob.HasValue)
                return "";

            TimeSpan ts = DateTime.Now.Subtract(dob.Value);
            int totalDays = (int)ts.TotalDays;
            int totalWeeks = totalDays / 7;
            int totalMonths = totalDays / 30;
            int totalYears = totalMonths / 12;
            int months = totalMonths - (totalYears * 12);

            string age = string.Empty;
            if (totalMonths <= 6)
                age = totalWeeks.ToString() + " weeks";
            else if (totalMonths < 12)
                age = totalMonths.ToString() + " month-old";
            else if (totalYears <= 10)
                age = totalYears.ToString() + '.' + months.ToString() + " year-old";
            else
                age = totalYears.ToString() + " year-old";

            return age;
        }

    }
}