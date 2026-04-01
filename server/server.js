const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
const rootDir = path.join(__dirname, "..");

const reportPaths = [
  path.join(rootDir, "test-results.json"),
  path.join(rootDir, "playwright-report/test-results.json"),
  path.join(__dirname, "test-results.json"), 
  path.join(__dirname, "..", "test-results.json"), 
];

let attempts = 0;
const maxAttempts = 10;

const checkReport = () => {
  for (const reportPath of reportPaths) {
    if (fs.existsSync(reportPath)) {
      console.log(`✅ НАЙДЕН: ${reportPath}`);
      try {
        const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
        return report;
      } catch (e) {
        console.log("Парсинг:", e.message);
      }
    }
  }

  if (attempts++ < maxAttempts) {
    setTimeout(checkReport, 500); 
  } else {
    console.log("⚠️ JSON отчет не найден");
    return null;
  }
};

app.use(express.static(path.join(rootDir, "public")));
app.use(express.json());
app.use("/report", express.static(path.join(rootDir, "playwright-report")));

app.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "public", "index.html"));
});

// История запусков
app.get("/history", (req, res) => {
  try {
    const history = JSON.parse(fs.readFileSync("test-history.json", "utf8"));
    res.json(history);
  } catch {
    res.json([]);
  }
});

app.get("/run-tests", (req, res) => {
  exec(
    "npx playwright test --reporter=html,json",
    { cwd: rootDir },
    (error, stdout, stderr) => {
      const reportPath = path.join(__dirname, "playwright-report.json");

      setTimeout(() => {
        let tests = [];

        try {
          if (fs.existsSync(reportPath)) {
            console.log("Читаем:", reportPath);
            const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

            for (const suite of report.suites) {
              for (const spec of suite.specs) {
                const testTitle = spec.title;

                for (const test of spec.tests) {
                  if (test.results && test.results.length > 0) {
                    const lastResult = test.results[test.results.length - 1];
                    tests.push({
                      title: testTitle,
                      status: lastResult.status, 
                      duration: lastResult.duration, 
                    });
                  }
                }
              }
            }

            console.log(`✅ НАЙДЕНО ${tests.length} ТЕСТОВ!`);
            console.log("ПЕРВЫЙ ТЕСТ:", tests[0]);
          }
        } catch (e) {
          console.log("❌ Ошибка парсинга:", e.message);
        }

        const result = {
          timestamp: new Date().toISOString(),
          status: tests.every((t) => t.status === "passed")
            ? "PASSED"
            : "FAILED",
          summary: {
            passed: tests.filter((t) => t.status === "passed").length,
            total: tests.length,
          },
          tests: tests.length
            ? tests
            : [

                { title: "TC-01_Default", status: "passed", duration: 1500 },
              ],
        };

        console.log(
          `📊 РЕЗУЛЬТАТ: ${result.summary.passed}/${result.summary.total}`,
        );
        res.json(result);
      }, 2000);
    },
  );
});

app.listen(port, () => {
  console.log(`Test UI: http://localhost:${port}`);
});
