var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  $(function () {
    dynamic();
    showGraph();
  });

  function dynamic() {
    origin = new Date("Jun 1, 2014");

    updateDays();
    $("#chartTitle").text(
      "The past " +
        daysPassed +
        " days, in terms of how many lines of code I've written"
    );
    setInterval(function () {
      updateDays();
    }, 1000);
  }

  function updateDays() {
    var now = new Date();
    daysPassed = ((now.getTime() - origin.getTime()) / 86400000).format(5);

    if (isCode)
      $("#chartTitle").html(
        "The past " +
          daysPassed +
          " days - in terms of how many lines of code I've written</div>"
      );
    else if (isBeer)
      $("#chartTitle").text(
        "The past " + daysPassed + " days - in terms of how many beers I've had"
      );
    else if (isMiles)
      $("#chartTitle").text(
        "The past " +
          daysPassed +
          " days - in terms of how many miles I've biked/swam/run"
      );
  }

  /* Graphs */
  var w = 500,
    h = 200,
    barPadding = 1,
    startYear = 2014,
    svg,
    isCode = true,
    // Jun - May
    beer = [
      // Rensselaer
      18,
      17,
      18,
      19,
      20,
      21,
      21,
      22,
      20,
      19,
      18,
      17, // Junior yr
      18,
      19,
      20,
      21,
      23,
      24,
      26,
      27,
      28,
      29,
      30,
      28, // Senior yr
      // Blend
      5,
      8,
      1,
      4,
      5,
      6,
      2,
      4,
      5,
      6,
      3,
      6, // Freshman yr
      4,
      5,
      8,
      2,
      1,
      5,
      6,
      4,
      4,
      5,
      3, // Sophomore yr
      2,
      3,
      2,
      2,
      2,
      1,
      1,
      1,
      2,
      1,
      1,
      1, // Junior yr
      3,
      3,
      4,
      6,
      5,
      4,
      5,
      4,
      6,
      5,
      4,
      3, // Senior yr
      // Pave
      2,
      16,
      18,
      20,
      22,
      23,
      22,
      20,
      22,
      23,
      27,
      26,
    ],
    // Jun - May
    code = [
      // Amador
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4,
      // Rensselaer
      4, 4, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 9, 8, 8, 12, 13, 14, 13, 13, 13, 13,
      13,
      // Coursera
      13, 13, 13, 24, 24, 26, 25, 26, 16, 16, 16, 16, 26, 27, 28, 27, 16, 17,
      17, 10, 10, 36, 38, 40,
      // Blend
      40, 41, 42, 42, 43, 44, 40, 40, 42, 44, 46, 44,
    ],
    miles = [
      // Amador
      14, 14, 16, 16, 16, 12, 10, 8, 6, 6, 8, 10, 14, 14, 16, 16, 16, 12, 10, 7,
      5, 5, 3, 2,
      // Rensselaer
      14, 14, 12, 7, 6, 8, 10, 10, 8, 6, 4, 3, 12, 12, 10, 9, 12, 8, 8, 8, 10,
      8, 10, 12, 10, 8, 8, 8, 8, 10, 10, 10, 8, 8, 8, 8, 8, 12, 14, 16, 18, 20,
      34, 32, 30, 28, 28,
      // Blend
      28, 28, 26, 24, 22, 28, 26, 24, 22, 20, 18, 20,
    ];

  function showGraph() {
    //Create SVG element
    svg = d3
      .select("#barChart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(code)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return i * (w / code.length);
      })
      .attr("y", function (d) {
        return h - d * 4;
      })
      .attr("fill", "rgb(1, 113, 187)")
      .attr("width", w / code.length - barPadding)
      .attr("height", function (d) {
        return d * 4;
      });

    d3.select("#code").on("click", function () {
      showCode();
    });
    d3.select("#beer").on("click", function () {
      showBeer();
    });
    d3.select("#miles").on("click", function () {
      showMiles();
    });
  }

  function showCode() {
    isCode = true;
    isBeer = false;
    isMiles = false;
    $("#code.toggle").css("text-decoration", "underline");
    $("#beer.toggle").css("text-decoration", "none");
    $("#miles.toggle").css("text-decoration", "none");

    svg
      .selectAll("rect")
      .data(code)
      .transition()
      .delay(function (d, i) {
        return i * 20;
      })
      .duration(1000)
      .attr("y", function (d) {
        return h - d * 4;
      })
      .attr("width", w / code.length - barPadding)
      .attr("height", function (d) {
        return d * 4;
      });
  }

  function showBeer() {
    isCode = false;
    isBeer = true;
    isMiles = false;
    $("#beer.toggle").css("text-decoration", "underline");
    $("#code.toggle").css("text-decoration", "none");
    $("#miles.toggle").css("text-decoration", "none");

    svg
      .selectAll("rect")
      .data(beer)
      .transition()
      .delay(function (d, i) {
        return i * 20;
      })
      .duration(1000)
      .attr("y", function (d) {
        return h - d * 4;
      })
      .attr("width", w / beer.length - barPadding)
      .attr("height", function (d) {
        return d * 4;
      });
  }

  function showMiles() {
    isCode = false;
    isBeer = false;
    isMiles = true;
    $("#beer.toggle").css("text-decoration", "none");
    $("#code.toggle").css("text-decoration", "none");
    $("#miles.toggle").css("text-decoration", "underline");

    svg
      .selectAll("rect")
      .data(miles)
      .transition()
      .delay(function (d, i) {
        return i * 20;
      })
      .duration(1000)
      .attr("y", function (d) {
        return h - d * 4;
      })
      .attr("width", w / miles.length - barPadding)
      .attr("height", function (d) {
        return d * 4;
      });
  }
}
