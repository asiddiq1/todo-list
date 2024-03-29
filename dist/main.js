(() => {
  "use strict";
  class t {
    constructor(t, e, s, n, o, a) {
      (this.task_checked = t),
        (this.taskInfo = e),
        (this.priority = s),
        (this.date = n),
        (this.taskID = o),
        (this.projectid = a);
    }
    setTask(t) {
      this.taskID = t;
    }
    getTask() {
      return this.taskID;
    }
    setDate(t) {
      this.date = t;
    }
    getDate() {
      return this.date;
    }
    setPriority(t) {
      this.priority = t;
    }
    getPriority() {
      return this.priority;
    }
    setTaskInfo(t) {
      this.taskInfo = t;
    }
    getTaskInfo() {
      return this.taskInfo;
    }
    setChecked(t) {
      this.task_checked = t;
    }
    getChecked() {
      return this.task_checked;
    }
  }
  class e {
    constructor(t, e) {
      (this.name = t), (this.projectID = e), (this.tasks = []);
    }
    getprojectID() {
      return this.projectID;
    }
    setprojectID(t) {
      this.projectID = t;
    }
    getName() {
      return this.name;
    }
    setName(t) {
      this.name = t;
    }
    addTask(t) {
      this.tasks.push(t);
    }
    delTask(t) {
      this.tasks = this.tasks.filter((e) => e.getTask() !== t);
    }
    getTasks() {
      return this.tasks;
    }
    setTasks(t) {
      this.tasks = t;
    }
    findTask(t) {
      return this.tasks.find((e) => e.getTask() == t);
    }
  }
  function s(t) {
    return (
      (s =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      s(t)
    );
  }
  function n(t, e) {
    if (e.length < t)
      throw new TypeError(
        t +
          " argument" +
          (t > 1 ? "s" : "") +
          " required, but only " +
          e.length +
          " present",
      );
  }
  var o = {};
  function a() {
    return o;
  }
  function c(t, e) {
    var o, c, i, r, d, l, u, m;
    n(1, arguments);
    var p = a(),
      k = (function (t) {
        if (null === t || !0 === t || !1 === t) return NaN;
        var e = Number(t);
        return isNaN(e) ? e : e < 0 ? Math.ceil(e) : Math.floor(e);
      })(
        null !==
          (o =
            null !==
              (c =
                null !==
                  (i =
                    null !== (r = null == e ? void 0 : e.weekStartsOn) &&
                    void 0 !== r
                      ? r
                      : null == e ||
                        null === (d = e.locale) ||
                        void 0 === d ||
                        null === (l = d.options) ||
                        void 0 === l
                      ? void 0
                      : l.weekStartsOn) && void 0 !== i
                  ? i
                  : p.weekStartsOn) && void 0 !== c
              ? c
              : null === (u = p.locale) ||
                void 0 === u ||
                null === (m = u.options) ||
                void 0 === m
              ? void 0
              : m.weekStartsOn) && void 0 !== o
          ? o
          : 0,
      );
    if (!(k >= 0 && k <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var h = (function (t) {
        n(1, arguments);
        var e = Object.prototype.toString.call(t);
        return t instanceof Date || ("object" === s(t) && "[object Date]" === e)
          ? new Date(t.getTime())
          : "number" == typeof t || "[object Number]" === e
          ? new Date(t)
          : (("string" != typeof t && "[object String]" !== e) ||
              "undefined" == typeof console ||
              (console.warn(
                "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments",
              ),
              console.warn(new Error().stack)),
            new Date(NaN));
      })(t),
      g = h.getDay(),
      f = (g < k ? 7 : 0) + g - k;
    return h.setDate(h.getDate() - f), h.setHours(0, 0, 0, 0), h;
  }
  class i {
    constructor() {
      (this.projects = []),
        this.projects.push(new e("Inbox", "inbox")),
        this.projects.push(new e("Today", "today")),
        this.projects.push(new e("This Week", "this-week"));
      const s = new e("Home Improvement", "home-improvement");
      s.addTask(
        new t(
          !1,
          "Add lights to closet",
          "none",
          "2023-08-17",
          "HI-task1",
          "home-improvement",
        ),
      ),
        s.addTask(
          new t(
            !1,
            "Buy new couch for living room",
            "medium",
            "",
            "HI-task2",
            "home-improvement",
          ),
        ),
        s.addTask(
          new t(
            !0,
            "Clean office desk",
            "none",
            "2023-08-23",
            "HI-task3",
            "home-improvement",
          ),
        ),
        this.projects.push(s);
      const n = new e("Health and Wellness", "health-wellness");
      n.addTask(
        new t(
          !1,
          "Create workout goals",
          "medium",
          "2023-08-17",
          "HW-task1",
          "health-wellness",
        ),
      ),
        n.addTask(
          new t(
            !1,
            "Leg day",
            "high",
            "2023-08-19",
            "HW-task2",
            "health-wellness",
          ),
        ),
        n.addTask(
          new t(
            !0,
            "Meal prep",
            "none",
            "2023-08-17",
            "HW-task3",
            "health-wellness",
          ),
        ),
        this.projects.push(n);
      const o = new e("Travel", "travel");
      o.addTask(
        new t(
          !1,
          "Book flight and accomodations",
          "none",
          "2023-08-17",
          "T-task1",
          "travel",
        ),
      ),
        o.addTask(
          new t(
            !1,
            "Purchase travel equipment",
            "medium",
            "2023-08-19",
            "T-task2",
            "travel",
          ),
        ),
        o.addTask(
          new t(
            !0,
            "Plan activities",
            "low",
            "2023-08-17",
            "T-task3",
            "travel",
          ),
        ),
        this.projects.push(o);
    }
    setProjects(t) {
      this.projects = t;
    }
    getProjects() {
      return this.projects;
    }
    findProject(t) {
      return this.projects.find((e) => e.getprojectID() == t);
    }
    addProject(t) {
      this.projects.push(t);
    }
    delProject(t) {
      this.projects = this.projects.filter((e) => e.getprojectID() !== t);
    }
    setToday() {
      this.findProject("today").tasks = [];
      let t = new Date(new Date().toLocaleString().slice(0, 9))
        .toISOString()
        .slice(0, 10);
      this.projects.forEach((e) => {
        e.tasks.forEach((s) => {
          "today" != e.projectID &&
            "this-week" != e.projectID &&
            t == s.getDate() &&
            this.findProject("today").addTask(s);
        });
      });
    }
    setThisWeek() {
      this.findProject("this-week").tasks = [];
      let t = new Date().toLocaleString();
      this.projects.forEach((e) => {
        e.tasks.forEach((s) => {
          "today" != e.projectID &&
            "this-week" != e.projectID &&
            (function (t, e, s) {
              n(2, arguments);
              var o = c(t, s),
                a = c(e, s);
              return o.getTime() === a.getTime();
            })(new Date(t), new Date(s.getDate())) &&
            this.findProject("this-week").addTask(s);
        });
      });
    }
  }
  class r {
    static getTodoList() {
      const s = Object.assign(
          new i(),
          JSON.parse(localStorage.getItem("todolist")),
        ),
        n = s.getProjects().map((t) => Object.assign(new e(), t));
      return (
        s.setProjects(n),
        s.getProjects().forEach((e) => {
          e.setTasks(e.getTasks().map((e) => Object.assign(new t(), e)));
        }),
        s
      );
    }
    static setTodoList(t) {
      localStorage.setItem("todolist", JSON.stringify(t));
    }
    static addProject(t) {
      const e = r.getTodoList();
      e.addProject(t), r.setTodoList(e);
    }
    static deleteProject(t) {
      const e = r.getTodoList();
      e.delProject(t), r.setTodoList(e);
    }
    static clearStorage() {
      localStorage.clear();
    }
    static updateProjectName(t, e) {
      const s = r.getTodoList();
      s.findProject(e).setName(t), r.setTodoList(s);
    }
    static addTask(t, e) {
      const s = r.getTodoList();
      s.findProject(t).addTask(e), r.setTodoList(s);
    }
    static deleteTask(t, e) {
      const s = r.getTodoList();
      s.findProject(t).delTask(e), r.setTodoList(s);
    }
    static updateDate(t, e, s) {
      const n = r.getTodoList();
      n.findProject(t).findTask(e).setDate(s), r.setTodoList(n);
    }
    static updatePriority(t, e, s) {
      const n = r.getTodoList();
      n.findProject(t).findTask(e).setPriority(s), r.setTodoList(n);
    }
    static updateTaskInfo(t, e, s) {
      const n = r.getTodoList();
      n.findProject(t).findTask(e).setTaskInfo(s), r.setTodoList(n);
    }
    static updateStatus(t, e, s) {
      const n = r.getTodoList();
      n.findProject(t).findTask(e).setChecked(s), r.setTodoList(n);
    }
    static updateToday() {
      const t = r.getTodoList();
      t.setToday(), r.setTodoList(t);
    }
    static updateThisWeek() {
      const t = r.getTodoList();
      t.setThisWeek(), r.setTodoList(t);
    }
    static updateStatusToday(t, e) {
      const s = r.getTodoList().findProject("today").findTask(t).setChecked(e);
      s.setToday(), r.setTodoList(s);
    }
    static updateStatusWeek(t, e) {
      const s = r
        .getTodoList()
        .findProject("this-week")
        .findTask(t)
        .setChecked(e);
      s.setThisWeek(), r.setTodoList(s);
    }
  }
  function d(t, e) {
    const s = document.createElement("div");
    if (
      ((s.className = "project"),
      s.setAttribute("data-project", e),
      "inbox" == e || "today" == e || "this-week" == e)
    )
      s.classList.add("req-projects"), (s.textContent = t), (s.id = e);
    else {
      const n = document.createElement("p");
      (n.className = "project-name"), (n.textContent = t);
      const o = m("project", e);
      s.append(n, o), p(n);
    }
    return (
      s.addEventListener("click", function (t) {
        t.target.classList.contains("trash-project") ||
          ("today" == t.target.id
            ? ((document.getElementById("new-task").style.display = "none"),
              r.updateToday())
            : "this-week" == t.target.id
            ? ((document.getElementById("new-task").style.display = "none"),
              r.updateThisWeek())
            : (document.getElementById("new-task").style.display = "block"),
          document.querySelector(".active").classList.remove("active"),
          this.classList.add("active"),
          u());
      }),
      s
    );
  }
  function l(t) {
    const e = document.createElement("div");
    (e.className = "mytask"),
      e.setAttribute("data-task", t.taskID),
      e.setAttribute("data-project", t.projectid);
    const s = (function (t, e, s, n, o) {
        const a = document.createElement("div");
        a.className = "task";
        const c = document.createElement("input");
        (c.type = "checkbox"),
          (c.className = "checkbox"),
          (c.name = "checkbox"),
          s && ((c.checked = "true"), o.classList.add("checked")),
          c.addEventListener("change", (s) => {
            r.updateStatus(t, e, s.target.checked);
            let n = document.querySelector(".active");
            "today" == n.id && n.click(), "this-week" == n.id && n.click();
            let o = s.target.parentNode.parentNode;
            s.target.checked
              ? o.classList.add("checked")
              : o.classList.remove("checked"),
              u();
          });
        const i = document.createElement("p");
        return (
          (i.className = "task-info"),
          p(i),
          (i.textContent = n),
          a.append(c, i),
          a
        );
      })(t.projectid, t.taskID, t.task_checked, t.taskInfo, e),
      n = (function (t, e) {
        const s = document.createElement("select");
        s.name = "priority";
        const n = document.createElement("option");
        (n.value = "none"), (n.textContent = "none");
        const o = document.createElement("option");
        (o.value = "high"), (o.textContent = "high");
        const a = document.createElement("option");
        (a.value = "medium"), (a.textContent = "medium");
        const c = document.createElement("option");
        return (
          (c.value = "low"),
          (c.textContent = "low"),
          s.append(n, c, a, o),
          s.addEventListener("change", (s) => {
            r.updatePriority(t, e, s.target.value);
          }),
          s
        );
      })(t.projectid, t.taskID),
      o = (function (t) {
        const e = document.createElement("div");
        return (e.className = "due-date"), (e.textContent = t), e;
      })(t.date),
      a = (function (t, e) {
        const s = document.createElement("span");
        s.className = "date-picker-toggle";
        const n = document.createElement("img");
        (n.className = "calendar"), (n.src = "./images/calender.png");
        const o = document.createElement("input");
        return (
          (o.type = "date"),
          (o.className = "datepicker-form"),
          (o.value = new Date().toISOString().slice(0, 10)),
          o.addEventListener("change", (s) => {
            console.log("change"),
              (s.target.parentNode.previousElementSibling.textContent =
                s.target.value),
              r.updateDate(t, e, s.target.value);
          }),
          s.append(n, o),
          s
        );
      })(t.projectid, t.taskID),
      c = m("task", t.taskID);
    return (
      (function (t, e) {
        for (let s = 0; s < t.length; s++)
          t[s].value == e && (t[s].selected = !0);
      })(n, t.priority),
      e.append(s, n, o, a, c),
      e
    );
  }
  function u() {
    let t = document.getElementById("task-container");
    t.textContent = "";
    let e = (function (t) {
      let e = r.getTodoList().findProject(t).getTasks(),
        s = [];
      e.forEach((t) => {
        0 == t.task_checked && s.push(t);
      }),
        s.sort(function (t, e) {
          return t.date.localeCompare(e.date);
        }),
        s.sort(function (t, e) {
          return !t.date - !e.date || t.date.localeCompare(e.date);
        });
      let n = [];
      return (
        e.forEach((t) => {
          1 == t.task_checked && n.push(t);
        }),
        n.sort(function (t, e) {
          return !t.date - !e.date || t.date.localeCompare(e.date);
        }),
        s.concat(n)
      );
    })(document.querySelector(".active").getAttribute("data-project"));
    for (const s of e) {
      const e = l(s);
      t.append(e);
    }
  }
  function m(t, e) {
    const s = document.createElement("img");
    return (
      (s.src = "images/trash.png"),
      (s.alt = "trash"),
      (s.className = "trash-" + t),
      s.addEventListener("click", (s) => {
        if (
          (s.target.parentNode.remove(),
          "project" == t &&
            (r.deleteProject(e),
            s.target.parentNode.classList.contains("active")) &&
            (s.target.parentNode.classList.remove("active"),
            document.getElementById("inbox").classList.add("active")),
          "task" == t)
        ) {
          const t = document
            .querySelector(".active")
            .getAttribute("data-project");
          r.deleteTask(t, e);
        }
      }),
      s
    );
  }
  function p(t) {
    t.addEventListener("dblclick", (t) => {
      (t.target.contentEditable = "true"),
        t.target.focus(),
        t.target.addEventListener("keydown", k),
        t.target.addEventListener("focusout", k);
    });
  }
  function k(t) {
    ("Escape" !== t.key && "focusout" !== t.type && "Enter" !== t.key) ||
      ((this.contentEditable = "false"),
      this.removeEventListener("focusout", k),
      this.removeEventListener("keydown", k),
      this.classList.contains("project") ? h.call(this) : g.call(this));
  }
  function h() {
    let t = this.parentNode.getAttribute("data-project"),
      e = r.getTodoList().findProject(t);
    this.textContent !== e.name && r.updateProjectName(this.textContent, t);
  }
  function g() {
    let t = this.parentNode.parentNode.getAttribute("data-task"),
      e = this.parentNode.parentNode.getAttribute("data-project"),
      s = r.getTodoList().findProject(e).findTask(t);
    this.textContent !== s.taskInfo && r.updateTaskInfo(e, t, this.textContent);
  }
  function f() {
    let t = new Date(new Date().toLocaleString().slice(0, 9))
      .toISOString()
      .slice(0, 10);
    const e = document.getElementById("date-form");
    (document.getElementById("date-form-picker").value = t),
      (e.textContent = t);
  }
  !(function () {
    let t = r.getTodoList().getProjects(),
      e = document.getElementById("project-container");
    for (const s of t) {
      let t = d(s.getName(), s.getprojectID());
      e.append(t);
    }
  })(),
    document.getElementById("inbox").classList.add("active"),
    u(),
    (function () {
      const e = document.getElementById("new-task-form");
      e.addEventListener("submit", (s) => {
        s.preventDefault();
        let n = (Date.now() + Math.random()).toString(36),
          o = document.getElementById("priority-form").value,
          a = document.getElementById("checkbox-form").checked,
          c = document.getElementById("task-name-input").value,
          i = document.getElementById("date-form-picker").value,
          d = document.querySelector(".active").getAttribute("data-project");
        const l = new t(a, c, o, i, n, d);
        r.addTask(d, l), u(), e.reset(), f();
      });
    })(),
    (function () {
      const t = document.getElementById("new-project-form");
      t.addEventListener("submit", (s) => {
        s.preventDefault();
        let n = (Date.now() + Math.random()).toString(36);
        const o = document.getElementById("project-name-input").value;
        let a = document.getElementById("project-container");
        const c = d(o, n);
        r.addProject(new e(o, n)),
          a.append(c),
          document.querySelector(".active").classList.remove("active"),
          c.classList.add("active"),
          (document.getElementById("new-task").style.display = "block"),
          u(),
          t.reset();
      });
    })(),
    f(),
    (function () {
      const t = document.getElementById("new-project"),
        e = document.getElementById("new-project-form"),
        s = document.getElementById("project-name-input");
      document.addEventListener("click", (n) => {
        (e.contains(n.target) || "flex" != e.style.display) &&
        t.contains(n.target)
          ? ((n.target.style.display = "none"),
            (e.style.display = "flex"),
            s.focus())
          : ((e.style.display = "none"), (t.style.display = "block"));
      });
    })(),
    (function () {
      const t = document.getElementById("new-task"),
        e = document.getElementById("new-task-form"),
        s = document.getElementById("task-name-input"),
        n = document.getElementById("task-submit");
      document.addEventListener("click", (o) => {
        (!e.contains(o.target) && "grid" == e.style.display) ||
        n.contains(o.target)
          ? ((e.style.display = "none"), (t.style.display = "block"))
          : t.contains(o.target) &&
            ((t.style.display = "none"),
            (e.style.display = "grid"),
            s.focus(),
            (function () {
              const t = document.getElementById("date-form-picker"),
                e = document.querySelector(".date-form");
              t.addEventListener("change", (t) => {
                e.textContent = t.target.value;
              });
            })());
      });
    })();
})();
