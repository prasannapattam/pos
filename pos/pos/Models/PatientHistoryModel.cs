﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pos.Models
{
    public class PatientHistoryModel
    {
        public int ExamID { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime? ExamCorrectDate { get; set; }
        public int? CorrectExamID { get; set; }
        public int? SavedInd { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public string Doctor { get; set; }
    }
}