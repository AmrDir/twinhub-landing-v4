

// جلب جميع أسماء الصور من المسار
const clientImages = [
	'05551b48361291.5895ec5ca8529.jpg',
	'1.jpg',
	'1.png',
	'10.jpg',
	'11.jpg',
	'12-76816d4.jpg',
	'13.jpg',
	'17.jpg',
	'18.jpeg',
	'2.jpg',
	'2.png',
	'3.jpg',
	'3.png',
	'5.jpg',
	'5.png',
	'6.jpg',
	'7.jpg',
	'8.jpg',
	'9.jpg',
	'Logo1.png',
	'RED SEA LOGO.png',
	'avatars-000511228836-pmthbo-t500x500 (1).jpg',
	'blob-04ea318.png',
	'blob-3cd870b.png',
	'blob-af8c579.png',
	'logo royal company-02-01.png',
	'logo الكنافة السورى-01.png',
	'logo-fb6edbc.jpg',
	'logo.jpg',
	'logo.png',
];

interface ClientsSectionProps {
	language: string;
}

export default function ClientsSection({ language }: ClientsSectionProps) {
	const content = {
		en: {
			title: 'Clients & Success Partners',
			subtitle: 'Trusted by leading brands across industries',
			description:
				"We've had the privilege of working with amazing clients who trust us to bring their visions to life.",
			stats: {
				projects: 'Projects Completed',
				clients: 'Happy Clients',
				experience: 'Years Experience',
				satisfaction: 'Client Satisfaction',
			},
		},
		ar: {
			title: 'العملاء وشركاء النجاح',
			subtitle: 'موثوق من قبل العلامات التجارية الرائدة عبر الصناعات',
			description: 'لقد حظينا بشرف العمل مع عملاء رائعين يثقون بنا لتحقيق رؤاهم.',
			stats: {
				projects: 'مشروع مكتمل',
				clients: 'عميل سعيد',
				experience: 'سنة خبرة',
				satisfaction: 'رضا العملاء',
			},
		},
	};

	const t = content[language as keyof typeof content] || content.en;

	return (
		<section id="clients" className="py-12 bg-gray-50 relative overflow-hidden">
			{/* خلفية صورة ثابتة */}
			<div className="absolute inset-0 z-0">
				<img
					src="/backgrounds/clients/twinhub-bg.png"
					alt="Clients Background"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/60"></div>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="text-center mb-10">
					<h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
						<span className="text-red-600">{language === 'ar' ? 'العملاء' : 'Clients'}</span>
						<span className="mx-2">|</span>
						{language === 'ar' ? 'شركاء النجاح' : 'Success Partners'}
					</h2>
					<p className="text-gray-200 max-w-2xl mx-auto text-lg">
						{t.description}
					</p>
				</div>
				{/* شريط اللوجو المتحرك */}
				<div className="overflow-hidden py-8">
					<div className="flex gap-12 animate-marquee items-center">
						{clientImages.map((img, idx) => (
							<div key={img + idx} className="flex flex-col items-center justify-center">
								<div className="bg-white/80 rounded-xl shadow-lg p-4 transition-transform duration-500 hover:scale-110 hover:shadow-2xl">
									<img
										src={`/backgrounds/clients/${img}`}
										alt={img}
										className="h-20 w-auto object-contain mb-2"
										style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}
									/>
								</div>
								{/* تم حذف اسم الصورة */}
							</div>
						))}
					</div>
				</div>
			</div>
			{/* CSS للماركي */}
			<style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 30s linear infinite;
      }
    `}</style>
		</section>
	);
}