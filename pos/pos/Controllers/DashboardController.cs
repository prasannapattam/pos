using pos.Lib.Repository;
using pos.Lib.Shared;
using pos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pos.Controllers
{
    public class DashboardController : ApiController
    {
        public AjaxModel<List<SearchResultModel>> Get()
        {
            AjaxModel<List<SearchResultModel>> ajax = null;

            List<SearchResultModel> result = PatientRepository.MyPatients();

            if (result.Count == 0)
            {
                ajax = new AjaxModel<List<SearchResultModel>>() { Success = false, Message = PosMessage.DashboardNoPatients, Model = result };
            }
            else
            {
                ajax = new AjaxModel<List<SearchResultModel>>() { Success = true, Message = "", Model = result };
            }

            return ajax;
        }
    }
}
