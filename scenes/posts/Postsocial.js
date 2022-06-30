import Head from "next/head";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { TelegramShareButton, TelegramIcon } from "next-share";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { ViberShareButton, ViberIcon } from "next-share";
import { LinkedinShareButton, LinkedinIcon } from "next-share";
import { EmailShareButton, EmailIcon } from "next-share";

const Socials = ( ) => {
  return (
    <div className="flex w-full justify-evenly">
      <FacebookShareButton
        url={"https://www.facebook.com/campaign/landing.php?&campaign_id=1600506847&extra_1=s%7Cc%7C515922865595%7Ce%7Cfb%7C&placement=&creative=515922865595&keyword=fb&partner_id=googlesem&extra_2=campaignid%3D1600506847%26adgroupid%3D60825662376%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-297263798525%26loc_physical_ms%3D1012861%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQjw8O-VBhCpARIsACMvVLOU7JrqdPYs7GEer46EtHo0LvhlnOiHEBU0BsunWo4LQemyEuTpSRoaAlufEALw_wcB"}
        quote={"next-share is a social share buttons for your next React apps."}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton
        url={"https://t.me/+eXFILmSnCsExMjMy"}
        title={"next-share is a social share buttons for your next React apps."}
      >
        <TelegramIcon size={32} round/>
      </TelegramShareButton>
      <TwitterShareButton
        url={"http://www.tiktok.com/@igorpigas"}
        title={"next-share is a social share buttons for your next React apps."}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <ViberShareButton
        url={"https://invite.viber.com/?g2=AQBB8XipuiNf6k1ZdbEymgHPvNb5Pec8q5GWuCHX8wHP3HJ1I8hIb0vYLtFJqoVY"}
        title={"next-share is a social share buttons for your next React apps."}
      >
        <ViberIcon size={32} round />
      </ViberShareButton>
      <LinkedinShareButton url={"https://www.linkedin.com/in/%D0%B8%D0%B3%D0%BE%D1%80%D1%8C-%D0%BA%D0%BE%D1%81%D1%8C%D1%8F%D0%BD%D0%B5%D0%BD%D0%BA%D0%BE-058468b4/"}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <EmailShareButton
        url={"https://mail.google.com"}
        subject={"Next Share"}
        body="body"
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};

export default Socials;