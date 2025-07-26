import Link from "next/link";


export default function webMemberLayout  ({children}:{
    children: React.ReactNode;
}){
    return (
         <>
         <div className="w-full h-16 bg-gray-600 px-4 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 ">📚 ຮ້ານຫນັງສື ອອນລາຍ</h2>
                <h2 className="text-xl font-bold text-gray-900 "> ຄວາມຮູ້ໄຫມ່ໃກ້ສັນ </h2>
              </div>
              <div className="flex flex-row gap-2 bg-gray-600 ">
                <Link href="/">
                  <i className="fa fa-home mr-1"></i>
                  ໜ້າຫຼັກ
                </Link>
                <Link href="/member/register">
                  <i className="fa fa-user-plus "></i> ສະມັກສະມາຊິກ
                </Link>
                <Link href="/">
                  <i className="fa fa-clock "></i> ລ໋ອກອິນ
                </Link>
              </div>
          </div>
          <div className="">
            {children}
          </div>
         </>
    )
}