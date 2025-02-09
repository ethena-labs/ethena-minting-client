import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export const TransactionToast = (message: string, txHash: string) => {
  return (
    <div className="flex flex-col">
      <p>{message}</p>
      <Link
        href={`https://etherscan.io/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline flex items-center gap-1"
      >
        View on Etherscan
        <ArrowUpRightIcon className="w-4 h-4" />
      </Link>
    </div>
  );
};
