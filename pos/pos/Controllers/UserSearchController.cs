﻿using pos.Lib.Repository;
using pos.Lib.Shared;
using pos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace pos.Controllers
{
    public class UserSearchController : ApiController
    {
        public AjaxModel<List<SearchResultModel>> Post([FromBody] string criteria)
        {
            AjaxModel<List<SearchResultModel>> ajax = null;

            List<SearchResultModel> result = PosRepository.UserSearch(criteria.Trim());

            if (result.Count == 0)
            {
                ajax = new AjaxModel<List<SearchResultModel>>() { Success = false, Message = PosMessage.UserSearchNoRecords, Model = null };
            }
            else
            {
                ajax = new AjaxModel<List<SearchResultModel>>() { Success = true, Message = "", Model = result };
            }

            return ajax;
        }
    }
}