"use client"

import { useState, useEffect, useRef } from "react"
import Navigation from "@/components/shared/Navigation"
import Footer from "@/components/shared/Footer"

const issues = [
  { id: "depresi", label: "Depresi", icon: "😔" },
  { id: "kecemasan", label: "Kecemasan", icon: "😰" },
  { id: "stres", label: "Stres", icon: "😤" },
  { id: "hubungan", label: "Masalah Hubungan", icon: "💔" },
  { id: "keluarga", label: "Masalah Keluarga", icon: "👨‍👩‍👧‍👦" },
  { id: "pekerjaan", label: "Stres Pekerjaan", icon: "💼" },
  { id: "akademik", label: "Tekanan Akademik", icon: "📚" },
  { id: "lainnya", label: "Lainnya", icon: "💭" }
]

interface Message {
  id: number
  text: string
  sender: "user" | "konselor"
  timestamp: Date
}

const counselorResponses = {
  depresi: [
    "Terima kasih sudah berani berbagi. Perasaan sedih yang berkepanjangan memang berat. Bisakah kamu ceritakan lebih detail apa yang kamu rasakan?",
    "Saya memahami betapa sulitnya situasi ini. Kamu tidak sendirian dalam menghadapi ini.",
    "Langkah kecil setiap hari bisa membantu. Apa satu hal kecil yang bisa kamu lakukan hari ini untuk dirimu sendiri?"
  ],
  kecemasan: [
    "Kecemasan memang bisa sangat mengganggu. Mari kita coba teknik pernapasan sederhana. Tarik napas dalam-dalam, tahan 4 detik, lalu hembuskan perlahan.",
    "Apa yang biasanya memicu kecemasanmu? Mengenali pemicu bisa membantu kita mengatasinya.",
    "Ingat, kecemasan adalah respons normal tubuh. Kamu bisa belajar mengelolanya dengan baik."
  ],
  stres: [
    "Stres adalah bagian dari hidup, tapi kita bisa belajar mengelolanya. Apa sumber stres utamamu saat ini?",
    "Sudah mencoba teknik relaksasi? Kadang istirahat sejenak bisa sangat membantu.",
    "Mari kita identifikasi hal-hal yang bisa kamu kontrol dan yang tidak bisa kamu kontrol."
  ],
  hubungan: [
    "Masalah hubungan memang kompleks. Komunikasi yang baik sering menjadi kunci. Bagaimana komunikasimu dengan orang tersebut?",
    "Setiap hubungan punya tantangan. Yang penting adalah bagaimana kita menghadapinya bersama.",
    "Kadang kita perlu melihat dari perspektif yang berbeda. Sudah mencoba memahami sudut pandang mereka?"
  ],
  keluarga: [
    "Keluarga adalah sistem yang kompleks. Setiap anggota punya peran dan perasaannya masing-masing.",
    "Konflik keluarga bisa sangat menyakitkan karena melibatkan orang-orang terdekat. Bagaimana perasaanmu saat ini?",
    "Kadang kita perlu menetapkan batasan yang sehat, bahkan dengan keluarga."
  ],
  pekerjaan: [
    "Stres kerja sangat umum terjadi. Work-life balance memang penting untuk kesehatan mental.",
    "Apa aspek pekerjaan yang paling membuatmu stres? Mungkin kita bisa cari solusi praktisnya.",
    "Ingat, pekerjaan adalah bagian dari hidup, bukan seluruh hidup. Kesehatan mentalmu lebih penting."
  ],
  akademik: [
    "Tekanan akademik bisa sangat berat, terutama dengan ekspektasi yang tinggi. Kamu tidak sendirian menghadapi ini.",
    "Perfeksionisme kadang bisa menjadi beban. Sudah mencoba menetapkan ekspektasi yang lebih realistis?",
    "Belajar itu proses, bukan hasil. Yang penting adalah usaha dan kemajuan yang kamu buat."
  ],
  lainnya: [
    "Terima kasih sudah mempercayai saya. Ceritakan apa yang sedang kamu hadapi.",
    "Setiap masalah punya solusinya. Mari kita cari jalan keluarnya bersama-sama.",
    "Kamu sudah mengambil langkah yang tepat dengan mencari bantuan. Itu menunjukkan kekuatan."
  ]
}

export default function KonselorPage() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startChat = (issueId: string) => {
    setSelectedIssue(issueId)
    const welcomeMessage: Message = {
      id: 1,
      text: `Halo, saya konselor yang akan membantu Anda hari ini. Saya siap mendengarkan dan mendampingi Anda. Silakan ceritakan apa yang sedang Anda rasakan.`,
      sender: "konselor",
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate counselor typing and response
    setTimeout(() => {
      setIsTyping(false)
      const responses = counselorResponses[selectedIssue as keyof typeof counselorResponses] || counselorResponses.lainnya
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const counselorMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "konselor",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, counselorMessage])
    }, 1500 + Math.random() * 1000)
  }

  const endSession = () => {
    const endMessage: Message = {
      id: messages.length + 1,
      text: "Terima kasih telah berbagi dengan saya hari ini. Ingat, Anda tidak sendirian dan selalu ada bantuan tersedia. Jaga diri Anda baik-baik. Jika membutuhkan bantuan profesional lebih lanjut, jangan ragu untuk menghubungi psikolog.",
      sender: "konselor",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, endMessage])
    
    setTimeout(() => {
      setSelectedIssue(null)
      setMessages([])
    }, 3000)
  }

  if (selectedIssue) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Navigation />
        
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                K
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Konselor</h2>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <button
              onClick={endSession}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Akhiri Sesi
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-green-100" : "text-gray-500"
                  }`}>
                    {message.timestamp.toLocaleTimeString("id-ID", { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pesan Anda..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Kirim
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Catatan:</strong> Ini adalah layanan konseling sebaya. Jika Anda mengalami krisis atau memiliki pikiran untuk menyakiti diri, segera hubungi layanan darurat atau profesional kesehatan mental.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-space-grotesk text-4xl font-bold text-gray-900 mb-4">
            Konseling Sebaya Anonim
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan dukungan dari konselor sebaya yang terlatih dalam lingkungan yang aman dan anonim. 
            Pilih topik yang ingin Anda diskusikan untuk memulai sesi konseling.
          </p>
        </div>

        {/* Issue Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="font-space-grotesk text-2xl font-semibold text-gray-900 mb-6 text-center">
            Pilih Topik yang Ingin Didiskusikan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {issues.map((issue) => (
              <button
                key={issue.id}
                onClick={() => startChat(issue.id)}
                className="p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {issue.icon}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-green-700">
                  {issue.label}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="font-space-grotesk text-2xl font-semibold text-gray-900 mb-6 text-center">
            Bagaimana Cara Kerjanya?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Pilih Topik</h3>
              <p className="text-gray-600">
                Pilih topik atau masalah yang ingin Anda diskusikan dari daftar di atas
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Mulai Chat</h3>
              <p className="text-gray-600">
                Anda akan terhubung dengan konselor sebaya yang terlatih secara anonim
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Dapatkan Dukungan</h3>
              <p className="text-gray-600">
                Berbagi perasaan dan dapatkan dukungan dalam lingkungan yang aman
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg text-blue-900 mb-2">
            🔒 Privasi Terjamin
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Semua percakapan bersifat anonim dan rahasia</li>
            <li>• Data tidak disimpan setelah sesi berakhir</li>
            <li>• Konselor telah menandatangani perjanjian kerahasiaan</li>
            <li>• Anda dapat mengakhiri sesi kapan saja</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  )
}
