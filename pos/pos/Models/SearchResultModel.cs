using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pos.Models
{
    public class SearchResultModel
    {
        public int ID { get; set; }

        //Patient search result
        public string PatientNumber { get; set; }
        public string PatientName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? LastExamDate { get; set; }
        public string DOBString { get { return DateOfBirth.HasValue ? DateOfBirth.Value.ToShortDateString() : ""; } }

        //user search results
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }

    }
}