using pos.Lib.Domain;
using pos.Lib.Repository;
using pos.Lib.Shared;
using pos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace pos.Controllers
{
    public class ExamDefaultController : ApiController
    {
		public AjaxModel<NotesViewModel> Get(int doctorUserID, int? examDefaultID)
        {
		AjaxModel<NotesViewModel> ajax = new AjaxModel<NotesViewModel>() { Success = true };

            try
            {
                NotesDomain domain = new NotesDomain();
                ajax.Model = domain.GetDefaultNotes(doctorUserID, examDefaultID);

            }
            catch (Exception exp)
            {
                ajax.Success = false;
                ajax.Message = exp.Message;
                ajax.Model = null;
            }

            return ajax;
        }

    }
}
