﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace pos
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //ignoring the bundle list
            bundles.IgnoreList.Clear();

            //including all the libraries used in our app such as angular
            bundles.Add(
                new ScriptBundle("~/scripts/libraries")
                    .Include("~/scripts/jquery.js")
                    .Include("~/scripts/angular/angular.js")
                    .IncludeDirectory("~/scripts/angular", "*.js", true)
                    .Include("~/scripts/bootstrap.js")
                    .Include("~/scripts/kendo/kendo.all.min.js")
                );

            //including all the css used in our app
            bundles.Add(
                new StyleBundle("~/content/css")
                    .Include("~/content/bootstrap/bootstrap.css")
                    .Include("~/content/bootstrap/bootstrap-theme.css")
                    .Include("~/content/kendo.common.min.css")
                    .Include("~/content/kendo.blueopal.min.css")
                    .Include("~/content/app.css")
                );

            //including the javascript files in our app
            bundles.Add(
                new ScriptBundle("~/scripts/app")
                    .Include("~/app/app.js")
                    .IncludeDirectory("~/app", "*.js", true)
                );
        }
    }
}