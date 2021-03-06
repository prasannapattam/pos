﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pos.Models
{
    public class ExamDefaultModel
    {
        public int ExamDefaultID { get; set; }
        public string DefaultName { get; set; }
        public int AgeStart { get; set; }
        public int AgeEnd { get; set; }
        public bool PrematureBirth { get; set; }
        public int DoctorUserID { get; set; }
        public string ExamText { get; set; }
        public string DoctorUserName { get; set; }
        public string DoctorName { get; set; }
    }
}