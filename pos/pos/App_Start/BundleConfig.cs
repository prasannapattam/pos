using System.Web;
using System.Web.Optimization;

namespace pos.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(
                new ScriptBundle("~/scripts/libraries")
                    .Include("~/scripts/jquery-2.1.0.min.js")
                    .Include("~/scripts/angular/angular.min.js")
                    .Include("~/scripts/angular/angular-cookies.min.js")
                    .Include("~/scripts/angular/angular-loader.min.js")
                    .Include("~/scripts/angular/angular-resource.min.js")
                    .Include("~/scripts/angular/angular-route.min.js")
                    .Include("~/scripts/angular/angular-route.min.js")
                    .Include("~/scripts/toastr.js")
                    .Include("~/scripts/modernizr-2.7.1.js")
                    .Include("~/scripts/moment-with-langs.js")
                    .Include("~/scripts/jquery.textcomplete.js")
                    .Include("~/scripts/kendo/kendo.ui.core.min.js")
                    .Include("~/scripts/kendo/kendo.window.min.js")
                    .Include("~/scripts/bootstrap/bootstrap.min.js")
            );


            bundles.Add(
                new StyleBundle("~/content/css")
                    .Include("~/content/normalize.css")
                    .Include("~/content/kendo.common.min.css")
                    .Include("~/content/kendo.blueopal.min.css")
                    .Include("~/content/toastr.css")
                    .Include("~/content/jquery.textcomplete.css")
                    .Include("~/content/app.css")
                      .Include("~/content/bootstrap/bootstrap-theme.min.css")
                       .Include("~/content/bootstrap/bootstrap.min.css")
                );
        }
    }
}