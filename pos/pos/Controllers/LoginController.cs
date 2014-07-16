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
    public class LoginController : ApiController
    {
        public AjaxModel<ProfileModel> Post([FromBody] LoginModel model)
        {
            AjaxModel<ProfileModel> ajax = null;

            ProfileModel profile = PosRepository.ProfileGet(model);
            if(profile == null)
            {
                ajax = new AjaxModel<ProfileModel>() { Success = false, Message = PosMessage.LoginError, Model = null };
            }
            else
            {
                ajax = new AjaxModel<ProfileModel>() { Success = true, Message = "", Model = profile };
            }
            return ajax;
        }
    }
}
