﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class PosEntities : DbContext
    {
        public PosEntities()
            : base("name=PosEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Exam> Exams { get; set; }
        public virtual DbSet<ExamData> ExamDatas { get; set; }
        public virtual DbSet<ExamDataConfiguration> ExamDataConfigurations { get; set; }
        public virtual DbSet<ExamDefault> ExamDefaults { get; set; }
        public virtual DbSet<ExamLookUp> ExamLookUps { get; set; }
        public virtual DbSet<LookUp> LookUps { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<PrintQueue> PrintQueues { get; set; }
        public virtual DbSet<Schedule> Schedules { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<AutoCorrect> AutoCorrects { get; set; }
    }
}
