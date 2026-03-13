import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Step1ne
          </span>
          <span className="text-sm text-gray-400">Headhunter Platform</span>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6">
        <section className="py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            找到你的職涯
            <br />
            <span className="text-blue-600">下一步</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Step1ne 專業獵頭顧問團隊，為你媒合最適合的職涯機會。
            透過個人化的顧問頁面，探索職缺、投遞履歷、智慧媒合。
          </p>
          <Link
            href="/consultants/jacky"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-blue-600 text-white font-medium text-base hover:bg-blue-700 transition-colors"
          >
            查看顧問頁面 Demo
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Features */}
        <section className="py-16 border-t border-gray-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">精選職缺</h3>
              <p className="text-sm text-gray-500">
                瀏覽顧問精心篩選的職缺，每個機會都經過專業評估。
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">智慧履歷解析</h3>
              <p className="text-sm text-gray-500">
                上傳履歷自動解析，支援 LinkedIn、104、自製履歷格式。
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">職缺媒合</h3>
              <p className="text-sm text-gray-500">
                多維度智慧匹配，自動推薦最適合你的職缺機會。
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Step1ne. All rights reserved.
      </footer>
    </div>
  );
}
