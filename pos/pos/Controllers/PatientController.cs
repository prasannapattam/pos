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
    public class PatientController : ApiController
    {
        public AjaxModel<PatientModel> Get(int id  = 290)
        {
            AjaxModel<PatientModel> ajax = null;

            PatientModel result = PatientRepository.PatientGet(id, true);

            if(result == null)
            {
                ajax = new AjaxModel<PatientModel>() { Success = false, Message = PosMessage.PatientInvalid, Model = null };
            }
            else
            {
                ajax = new AjaxModel<PatientModel>(){Success = true, Message = "", Model = result };
            }

            return ajax;
        }

        public AjaxModel<string> Post([FromBody] PatientModel model)
        {
            AjaxModel<string> ajax = new AjaxModel<string>() { Success = true, Message = PosMessage.PatientSaveSuccessful, Model = PosMessage.Blank };
            try
            {
                PatientRepository.PatientSave(model);
            }
            catch(Exception exp)
            {
                ajax.Success = false;
                ajax.Message = exp.Message;
            }


            return ajax;
        }
    }
}
