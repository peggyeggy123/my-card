
import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  Stethoscope, 
  TrendingUp, 
  Users, 
  Scale, 
  Car, 
  Save,
  ChevronRight,
  Mail
} from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

const INITIAL_CONTACT: ContactInfo = {
  name: "洪薏晴",
  company: "三商美邦人壽",
  title: "RFA 退休理財規劃師",
  slogan: "用專業回應您的信任，用溫度陪伴您的日常。",
  phone: "0917979019", 
  lineId: "t-4cUJ2Op1", 
  instagramId: "ching_1777", 
  email: "ching@example.com",
  customAvatarUrl: "https://i.postimg.cc/FRw3NtDc/profile.png" 
};

const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: '醫療保險',
    description: '保單檢視 / 理賠服務',
    icon: <Stethoscope size={18} />,
    color: 'bg-blue-500/10 text-blue-400'
  },
  {
    id: '2',
    title: '投資理財',
    description: '資產配置 / 現金流規劃',
    icon: <TrendingUp size={18} />,
    color: 'bg-orange-500/10 text-orange-400'
  },
  {
    id: '3',
    title: '企業團險',
    description: '雇主責任 / 留才計劃',
    icon: <Users size={18} />,
    color: 'bg-purple-500/10 text-purple-400'
  },
  {
    id: '4',
    title: '稅務規劃',
    description: '預留稅源 / 資產傳承',
    icon: <Scale size={18} />,
    color: 'bg-green-500/10 text-green-400'
  },
  {
    id: '5',
    title: '產險服務',
    description: '車險、火險、旅平險',
    icon: <Car size={18} />,
    color: 'bg-red-500/10 text-red-400'
  }
];

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all cursor-pointer group active:scale-[0.98]">
    <div className={`p-2.5 rounded-xl ${item.color} border border-current/10`}>
      {item.icon}
    </div>
    <div className="flex-1">
      <h4 className="text-white font-bold text-[16px] tracking-wide">{item.title}</h4>
      <p className="text-gray-400 text-[13px] mt-0.5">{item.description}</p>
    </div>
    <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
  </div>
);

const App: React.FC = () => {
  const [contact] = useState<ContactInfo>(INITIAL_CONTACT);
  const [cacheBuster] = useState(() => Date.now());

  const handleSaveContact = () => {
    // 格式化電話號碼為國際格式（+886...）以利通訊錄辨識
    const formattedPhone = contact.phone.startsWith('0') 
      ? `+886${contact.phone.substring(1)}` 
      : contact.phone;

    // 建立標準 vCard 3.0 格式字串
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN;CHARSET=UTF-8:${contact.name}`,
      `N;CHARSET=UTF-8:;${contact.name};;;`,
      `ORG;CHARSET=UTF-8:${contact.company}`,
      `TITLE;CHARSET=UTF-8:${contact.title}`,
      `TEL;TYPE=CELL:${formattedPhone}`,
      `EMAIL;TYPE=INTERNET,HOME:${contact.email}`,
      `URL:https://line.me/ti/p/${contact.lineId}`,
      `NOTE;CHARSET=UTF-8:專業理財規劃師 - ${contact.name}`,
      'END:VCARD'
    ].join('\r\n'); // 使用 \r\n 以確保跨平台相容性

    // 建立 Blob 物件
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // 觸發下載
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contact.name}_聯絡資訊.vcf`);
    document.body.appendChild(link);
    link.click();
    
    // 清理資源
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const avatarSource = contact.customAvatarUrl || `./profile.jpg?t=${cacheBuster}`;

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex justify-center items-start sm:py-8 font-sans">
      <div className="w-full max-w-[420px] bg-[#0c1425] min-h-screen sm:min-h-[820px] sm:rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative border border-white/5">
        
        {/* 頂部圖片區域 - 1:1 比例 */}
        <div className="relative aspect-square overflow-hidden bg-[#0c1425]">
          <div className="absolute inset-0 hex-pattern opacity-20"></div>
          
          <div className="absolute inset-0 flex items-start justify-center z-10">
            <img 
              src={avatarSource}
              alt={contact.name} 
              className="h-full w-full object-cover object-top scale-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://api.a0.dev/assets/image?text=Professional%20Asian%20Female%20Financial%20Advisor%20Portrait&aspect=1:1";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425] via-transparent to-transparent opacity-100"></div>
          </div>

          <div className="absolute bottom-10 left-8 z-20 max-w-[280px]">
             <div className="inline-block px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded mb-2 backdrop-blur-sm">
                <span className="text-amber-400 text-[11px] font-black tracking-[0.2em] uppercase">Certified RFA</span>
             </div>
             <h1 className="text-5xl font-black text-white tracking-tighter mb-1 drop-shadow-2xl">
               {contact.name}
             </h1>
             <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-[#0c1425] px-2 py-0.5 rounded text-[12px] font-black uppercase tracking-tight shadow-lg">
                    {contact.company}
                  </span>
               </div>
               <p className="text-gray-200 text-sm font-bold tracking-wide">
                 {contact.title}
               </p>
             </div>
          </div>
        </div>

        {/* 內容區塊 */}
        <div className="px-6 flex-1 bg-[#0c1425] relative z-30">
          <div className="pb-8 pt-6">
             <p className="text-gray-400 text-[15px] leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
               "{contact.slogan}"
             </p>
          </div>

          {/* 快速聯繫按鈕 */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            <a href={`tel:${contact.phone}`} className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-amber-500 rounded-2xl text-[#0c1425] shadow-lg shadow-amber-500/20 group-active:scale-95 transition-all">
                <Phone size={24} strokeWidth={2.5} />
              </div>
              <span className="text-white text-[12px] font-bold opacity-60 uppercase tracking-tighter">電話</span>
            </a>
            <a href={`https://line.me/ti/p/${contact.lineId}`} target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-2xl text-[#06c755] group-active:scale-95 transition-all">
                <MessageCircle size={24} fill="currentColor" />
              </div>
              <span className="text-white text-[12px] font-bold opacity-60 uppercase tracking-tighter">LINE</span>
            </a>
            <a href={`https://www.instagram.com/${contact.instagramId}`} target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-2xl text-[#e4405f] group-active:scale-95 transition-all">
                <Instagram size={24} />
              </div>
              <span className="text-white text-[12px] font-bold opacity-60 uppercase tracking-tighter">IG</span>
            </a>
          </div>

          {/* 專業服務列表 */}
          <div className="space-y-4 pb-56">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-black text-[13px] tracking-[0.2em] uppercase opacity-80">專業服務領域</h3>
               <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
            </div>
            {SERVICES.map(service => (
              <ServiceCard key={service.id} item={service} />
            ))}
          </div>
        </div>

        {/* 底部行動區域 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0c1425] via-[#0c1425] to-transparent backdrop-blur-xl z-50">
          <div className="flex flex-col gap-3">
            {/* 主按鈕：與我聊聊 */}
            <a 
              href={`https://line.me/ti/p/${contact.lineId}`}
              target="_blank"
              className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-4.5 rounded-2xl font-black text-[17px] shadow-[0_15px_35px_rgba(6,199,85,0.25)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <MessageCircle size={22} fill="white" />
              立即與我聊聊
            </a>

            {/* 次要按鈕：加入通訊錄 - 觸發 vCard 下載 */}
            <button 
              onClick={handleSaveContact}
              className="w-full bg-white/[0.05] border border-white/10 text-amber-500 py-3.5 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all opacity-80 hover:opacity-100"
            >
              <Save size={16} strokeWidth={2.5} />
              加入通訊錄
            </button>
          </div>
          
          <div className="mt-5 flex flex-col items-center opacity-40">
             <div className="flex items-center gap-3">
                <Mail size={14} className="text-white" />
                <span className="text-[11px] text-white font-bold tracking-widest uppercase">
                  Sanshang Meibang Life
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
