using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace pos
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                name: "Test",
                url: "test",
                defaults: new { controller = "Home", action = "Test" }
            );

            routes.MapRoute(
                "default",
                "{*url}",
                new { controller = "Home", action = "Index" }
            );
        }
    }
}