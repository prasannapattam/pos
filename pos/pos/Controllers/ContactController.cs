using pos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pos.Controllers
{
    public class ContactController : ApiController
    {
        public AjaxModel<UserModel> Get()
        {
            UserModel model = new UserModel()
            {
                UserID = 26,
                FirstName = "Prakul",
                LastName = "Pattam"
            };

            AjaxModel<UserModel> ajax = new AjaxModel<UserModel>() { Success = true, Message = "", Model = model };

            return ajax;

        }

        public bool Post(UserModel user)
        {
            return true;
        }
    }
}
