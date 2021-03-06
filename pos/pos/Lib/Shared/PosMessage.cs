﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pos.Lib.Shared
{
    public static class PosMessage
    {
        public const string LoginError = "Invalid username or password";

        //patient
        public const string PatientSearchNoRecords = "No patients found for the search criteria";
        public const string PatientInvalid = "Invalid Patient ID";
        public const string PatientNumberExists = "Patient Number already exists";
        public const string PatientSaveSuccessful = "Patient saved successfully";

        //user
        public const string UserSearchNoRecords = "No Users found for the search criteria";
        public const string UserInvalid = "Invalid User ID";
        public const string UserSaveSuccessful = "User saved successfully";
        public const string UserNameExists = "User Name already exists";

        //PrintQueue
        public const string PrintQueueError = "Unable to retrieve print queue";
        public const string PrintQueueDeleteSuccessful = "Removed queue item";
        public const string PrintQueueDeleteError = "Error in removing queue item, please try again";

        //Notes
        public const string NotesSaveSuccessful = "Notes saved successfully";
        public const string NotesCorrectSuccessful = "Notes corrected successfully";
        public const string NotesSignOffSuccessful = "Notes SignOff successfully";

        public const string LookUpGetError = "Unable to retrieve Drop Down data";

        public const string Blank = "There is no data to pass back to the client";


        //Lookups
        public const string LookupsSavedSuccessfully = "Lookups saved successfully";
        public const string LookUpsSaveError = "Unable saved Lookups";

        //compat
        public const string LastVisitDateUpdateSuccess = "Successfully updated Last Visit Date";

        //dashboard
        public const string DashboardNoPatients = "No patients for today";
     
    }
}