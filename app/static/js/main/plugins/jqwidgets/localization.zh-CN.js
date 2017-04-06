var getLocalization = function (culture) {
    var localization = null;
    switch (culture) {
        case "zh-CN":
            localization =
             {
                 // separator of parts of a date (e.g. '/' in 11/05/1955)
                 '/': "/",
                 // separator of parts of a time (e.g. ':' in 05:44 PM)
                 ':': ":",
                 // the first day of the week (0 = Sunday, 1 = Monday, etc)
                 firstDay: 1,
                 days: {
                     // full day names
                     names: ["周日","周一","周二","周三","周四","周五","周六"],
                     // abbreviated day names
                     namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
                     // shortest day names
                     namesShort: ["日","一","二","三","四","五","六"]
                 },

                 months: {
                     // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                     names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
                     // abbreviated month names
                     namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
                 },
                 // AM and PM designators in one of these forms:
                 // The usual view, and the upper and lower case versions
                 //      [standard,lowercase,uppercase]
                 // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                 //      null
                 AM: ["上午","上午","上午"],
                 PM: ["下午","下午","下午"],
                 eras: [
                 // eras in reverse chronological order.
                 // name: the name of the era in this culture (e.g. A.D., C.E.)
                 // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                 // offset: offset in years from gregorian calendar
                 {"name":"公元","start":null,"offset":0}
                 ],
                 twoDigitYearMax: 2029,
                 patterns:
                  {
                      d: "yyyy/M/d",
				      D: "yyyy'年'M'月'd'日'",
				      t: "H:mm",
				      T: "H:mm:ss",
				      f: "yyyy'年'M'月'd'日' H:mm",
				      F: "yyyy'年'M'月'd'日' H:mm:ss",
				      M: "M'月'd'日'",
				      Y: "yyyy'年'M'月'"
                  },
                 percentsymbol: "%",
                 currencysymbol: "€",
                 currencysymbolposition: "after",
                 decimalseparator: '.',
                 thousandsseparator: ',',
                 pagergotopagestring: "选择页:",
                 pagershowrowsstring: "行数:",
                 pagerrangestring: "总计:",
                 pagerpreviousbuttonstring: "nächster",
                 pagernextbuttonstring: "voriger",
                 pagerfirstbuttonstring: "first",
                 pagerlastbuttonstring: "last",
                 groupsheaderstring: "Ziehen Sie eine Kolumne und legen Sie es hier zu Gruppe nach dieser Kolumne",
                 sortascendingstring: "升序",
                 sortdescendingstring: "降序",
                 sortremovestring: "取消你选择的排序",
                 groupbystring: "Group By this column",
                 groupremovestring: "Remove from groups",
                 filterclearstring: "清除筛选",
                 filterstring: "筛选",
                 filtershowrowstring: "条件过滤:",
                 filterorconditionstring: "或",
                 filterandconditionstring: "与",
                 filterselectallstring: "(全选)",
                 filterchoosestring: "选择过滤:",
                 filterstringcomparisonoperators: ['空', '非空', '包含', '包含(模糊查询)',
                   '不包含', '不包含(模糊查询)', '开始于', '开始于(模糊查询)',
                   '截止于', '截止于(模糊查询)', '等于', '不等于(模糊查询)', 'null', '非 null'],
                 filternumericcomparisonoperators: ['等于', '不等于', '小于', '小于等于', '大于', '大于等于', 'null', '非 null'],
                 filterdatecomparisonoperators: ['等于', '不等于', '小于', '小于等于', '大于', '大于等于', 'null', '非 null'],
                 filterbooleancomparisonoperators: ['等于', '不等于'],
                 validationstring: "输入值非法",
                 emptydatastring: "无数据",
                 filterselectstring: "选择过滤",
                 loadtext: "加载数据...",
                 clearstring: "清除",
                 todaystring: "今天"
             };
            break;
        case "en":
        default:
            localization =
            {
                // separator of parts of a date (e.g. '/' in 11/05/1955)
                '/': "/",
                // separator of parts of a time (e.g. ':' in 05:44 PM)
                ':': ":",
                // the first day of the week (0 = Sunday, 1 = Monday, etc)
                firstDay: 0,
                days: {
                    // full day names
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    // abbreviated day names
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    // shortest day names
                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                },
                months: {
                    // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                    // abbreviated month names
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                },
                // AM and PM designators in one of these forms:
                // The usual view, and the upper and lower case versions
                //      [standard,lowercase,uppercase]
                // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
                //      null
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                eras: [
                // eras in reverse chronological order.
                // name: the name of the era in this culture (e.g. A.D., C.E.)
                // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
                // offset: offset in years from gregorian calendar
                { "name": "A.D.", "start": null, "offset": 0 }
                ],
                twoDigitYearMax: 2029,
                patterns: {
                    // short date pattern
                    d: "M/d/yyyy",
                    // long date pattern
                    D: "dddd, MMMM dd, yyyy",
                    // short time pattern
                    t: "h:mm tt",
                    // long time pattern
                    T: "h:mm:ss tt",
                    // long date, short time pattern
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    // long date, long time pattern
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    // month/day pattern
                    M: "MMMM dd",
                    // month/year pattern
                    Y: "yyyy MMMM",
                    // S is a sortable format that does not vary by culture
                    S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                    // formatting of dates in MySQL DataBases
                    ISO: "yyyy-MM-dd hh:mm:ss",
                    ISO2: "yyyy-MM-dd HH:mm:ss",
                    d1: "dd.MM.yyyy",
                    d2: "dd-MM-yyyy",
                    d3: "dd-MMMM-yyyy",
                    d4: "dd-MM-yy",
                    d5: "H:mm",
                    d6: "HH:mm",
                    d7: "HH:mm tt",
                    d8: "dd/MMMM/yyyy",
                    d9: "MMMM-dd",
                    d10: "MM-dd",
                    d11: "MM-dd-yyyy"
                },
                percentsymbol: "%",
                currencysymbol: "$",
                currencysymbolposition: "before",
                decimalseparator: '.',
                thousandsseparator: ',',
                pagergotopagestring: "Go to page:",
                pagershowrowsstring: "Show rows:",
                pagerrangestring: " of ",
                pagerpreviousbuttonstring: "previous",
                pagernextbuttonstring: "next",
                pagerfirstbuttonstring: "first",
                pagerlastbuttonstring: "last",
                groupsheaderstring: "Drag a column and drop it here to group by that column",
                sortascendingstring: "Sort Ascending",
                sortdescendingstring: "Sort Descending",
                sortremovestring: "Remove Sort",
                groupbystring: "Group By this column",
                groupremovestring: "Remove from groups",
                filterclearstring: "清除",
                filterstring: "过滤",
                filtershowrowstring: "Show rows where:",
                filterorconditionstring: "Or",
                filterandconditionstring: "And",
                filterselectallstring: "(Select All)",
                filterchoosestring: "Please Choose:",
                filterstringcomparisonoperators: ['empty', 'not empty', 'enthalten', 'enthalten(match case)',
                   'does not contain', 'does not contain(match case)', 'starts with', 'starts with(match case)',
                   'ends with', 'ends with(match case)', 'equal', 'equal(match case)', 'null', 'not null'],
                filternumericcomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterdatecomparisonoperators: ['equal', 'not equal', 'less than', 'less than or equal', 'greater than', 'greater than or equal', 'null', 'not null'],
                filterbooleancomparisonoperators: ['equal', 'not equal'],
                validationstring: "Entered value is not valid",
                emptydatastring: "No data to display",
                filterselectstring: "Select Filter",
                loadtext: "Loading...",
                clearstring: "Clear",
                todaystring: "Today"
            };
            break;
    }
    return localization;
};