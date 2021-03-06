﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pos.Models
{
    public class PrintQueueModel
    {
        public List<SelectListItem> Doctors { get; set; }

        public List<PrintQueueItem> Items { get; set; }
    }

    public class PrintQueueItem
    {
        public int ExamID { get; set; }
        public int PrintQueueID { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public string UserName { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime? ExamCorrectDate { get; set; }
        public int? CorrectExamID { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public bool? PrintExamNote { get; set; }
    }
}