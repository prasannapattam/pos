//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace pos.Lib.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class ExamData
    {
        public int ExamDataID { get; set; }
        public int PatientID { get; set; }
        public int ExamID { get; set; }
        public int ExamDataConfigurationID { get; set; }
        public string FieldName { get; set; }
        public string FieldValue { get; set; }
        public int FieldDataType { get; set; }
    }
}
