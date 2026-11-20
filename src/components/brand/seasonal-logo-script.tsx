import { seasonalLogos } from "@/config/site";

/**
 * Resolves the seasonal logo before the first paint.
 *
 * The site is fully static, so a build-time date check would freeze the logo
 * until the next deploy. This tiny blocking script reads the visitor's clock
 * in the window's own time zone, compares calendar dates (YYYY-MM-DD sorts
 * lexicographically) and writes `data-seasonal-logo` on <html>. CSS shows one
 * of the two logos already in the DOM, so there is no image swap after
 * hydration and no layout shift.
 *
 * Precedence: `?logo=christmas` / `?logo=main` for QA, then the windows, then
 * the main logo. The override is never stored. With JS off the attribute is
 * absent and CSS keeps the main logo visible.
 */
export function SeasonalLogoScript() {
  const windows = seasonalLogos.map(({ id, start, end, timeZone }) => ({
    id,
    start,
    end,
    timeZone,
  }));

  const source = `(function(){try{
var q=new URLSearchParams(window.location.search).get("logo");
if(q==="main"||q==="christmas"){document.documentElement.setAttribute("data-seasonal-logo",q);return;}
var windows=${JSON.stringify(windows)};
var now=new Date();
for(var i=0;i<windows.length;i++){
  var w=windows[i];
  var parts=new Intl.DateTimeFormat("en-GB",{timeZone:w.timeZone,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  var y="",m="",d="";
  for(var j=0;j<parts.length;j++){
    if(parts[j].type==="year")y=parts[j].value;
    else if(parts[j].type==="month")m=parts[j].value;
    else if(parts[j].type==="day")d=parts[j].value;
  }
  var today=y+"-"+m+"-"+d;
  if(today>=w.start&&today<=w.end){document.documentElement.setAttribute("data-seasonal-logo",w.id);return;}
}
document.documentElement.setAttribute("data-seasonal-logo","main");
}catch(e){document.documentElement.setAttribute("data-seasonal-logo","main");}})();`;

  return (
    <script
      // Runs during parse, before the body paints.
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
