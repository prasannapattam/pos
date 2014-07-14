using System.Web;
using System.Web.Optimization;

namespace pos
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(
                new ScriptBundle("~/scripts/libraries")
                    .Include("~/scripts/jquery-2.1.0.min.js")
                    .Include("~/scripts/angular.min.js")
                    .Include("~/scripts/angular-cookies.min.js")
                    .Include("~/scripts/angular-loader.min.js")
                     .Include("~/scripts/angular-resource.min.js")
                       .Include("~/scripts/angular-route.min.js")
                              .Include("~/scripts/angular-route.min.js")
                    .Include("~/scripts/toastr.js")
                    .Include("~/scripts/modernizr-2.7.1.js")
                    .Include("~/scripts/foundation/foundation.js")
                    .IncludeDirectory("~/scripts/foundation", "*.js")
                    .Include("~/scripts/moment-with-langs.js")
                    .Include("~/scripts/jquery.textcomplete.js")
                    .Include("~/scripts/kendo/kendo.ui.core.min.js")
                    .Include("~/scripts/kendo/kendo.window.min.js")
            );

            bundles.Add(
                new StyleBundle("~/content/css")
                    .Include("~/content/normalize.css")
                    .Include("~/content/kendo.common.min.css")
                    .Include("~/content/kendo.blueopal.min.css")
                    .Include("~/content/foundation.css")
                    .Include("~/content/foundation-icons.css")
                    .Include("~/content/foundation-datepicker.css")
                    .Include("~/content/durandal.css")
                    .Include("~/content/toastr.css")
                    .Include("~/content/jquery.textcomplete.css")
                    .Include("~/content/app.css")
                );
        }
    }
}