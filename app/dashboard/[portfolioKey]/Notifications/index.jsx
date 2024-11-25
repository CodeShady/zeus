import Navbar from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { formatFancyTimestamp } from "@/utils/formatFancyTimestamp";
import { formatNewlines } from "@/utils/formatNewlines";
import { IoMdDownload } from "react-icons/io";

export default function Notifications() {
  return (
    <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      {/* Header */}
      <div className="">
        <p className="opacity-50 font-medium">Your Portfolio</p>
        <h2 className="text-4xl font-medium">Notifications</h2>
      </div>

      <NotificationList />
    </motion.div>
  );
}

function NotificationList() {
  const { portfolio } = usePortfolio();

  return (
    <div className="mt-5 flex flex-col gap-4">
      {portfolio.notifications?.map((notification, index) => {
        return <Notification key={index} notification={notification} />;
      })}

      {/* Notifications are empty! */}
      {!portfolio.notifications?.length && (
        <h3 className="opacity-50">No notifications yet</h3>
      )}
    </div>
  );
}

function Notification({ notification }) {
  return (
    <div className="border-white/10 border rounded-xl p-4 w-full">
      {/* Timestamp */}
      <h2 className="opacity-50 text-sm">
        {formatFancyTimestamp(notification.sys.updatedAt)}
      </h2>

      {/* Title */}
      <h2 className="mt-1 font-medium text-lg">{notification.fields.title}</h2>

      {/* Content */}
      <p className="mt-1 opacity-75">
        {formatNewlines(notification.fields.message)}
      </p>

      {/* Attachment */}
      {notification.fields?.attachment && (
        <div>
          <a
            target="_blank"
            href={notification.fields.attachment.fields.file.url}
          >
            <div className="cursor-pointer mt-4 border-white/10 hover:opacity-75 transition-opacity border rounded-xl px-3.5 py-3 flex items-center justify-center gap-1.5 w-fit">
              {/* Icon */}
              <IoMdDownload className="w-5 h-5" />

              {/* File */}
              <h4 className="-mt-0.5">
                {notification.fields.attachment.fields.file.fileName}
              </h4>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
