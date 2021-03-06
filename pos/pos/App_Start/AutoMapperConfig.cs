﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using pos.Lib.Repository;
using pos.Models;

namespace pos
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.CreateMap<Patient, PatientModel>();
            Mapper.CreateMap<PatientModel, Patient>();
            Mapper.CreateMap<User, UserModel>();
            Mapper.CreateMap<UserModel, User>();
        }
    }
}