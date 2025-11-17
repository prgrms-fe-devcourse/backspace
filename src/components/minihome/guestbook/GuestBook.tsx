import { X } from "lucide-react";

import Button from "@/components/common/Button/Button";

import GuestbookWriteBox from "./GuestbookWriteBox";

export default function GuestBook() {
  return (
    <div className="p-4">
      <GuestbookWriteBox />
      <div className="flex flex-col gap-1">
        <span className="p">전체 방명록 {3}</span>
        <div className="bevel-pressed bg-text-invert gap-2 p-3">
          <ul>
            <li>
              <div className="bevel-default flex w-full flex-col gap-2 p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted dark:text-primary">친구이름</span>
                    <div className="flex gap-2">
                      <span className="opacity-50">2025.11.10 10:30</span>
                      <Button composition="iconOnly" size="sm" className="font-bold">
                        <X size="1em" strokeWidth={3} />
                      </Button>
                    </div>
                  </div>
                  <p>
                    내용내용내용내용내용내ㅛ용내요ㅐㄴ요ㅐㄴ요ㅐㄴ요내요ㅐㄴ요ㅐ뇨애뇨애뇨애뇨애뇨애뇨애뇨앤요ㅐ뇨애뇨애뇨애뇨애뇨애뇨애뇨애뇨애뇨애뇽
                  </p>
                </div>
                <div className="border-primary border-l-3 pl-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-accent">친구이름</span>
                      <div className="flex gap-2">
                        <span className="opacity-50">2025.11.10 10:30</span>
                        <Button composition="iconOnly" size="sm" className="font-bold">
                          <X size="1em" strokeWidth={3} />
                        </Button>
                      </div>
                    </div>
                    <p>
                      내용내용내용내용내용내ㅛ용내요ㅐㄴ요ㅐㄴ요ㅐㄴ요내요ㅐㄴ요ㅐ뇨애뇨애뇨애뇨애뇨애뇨애뇨앤요ㅐ뇨애뇨애뇨애뇨애뇨애뇨애뇨애뇨애뇨애뇽
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
