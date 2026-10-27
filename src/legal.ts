// The public Privacy Policy and Terms of Service. Text can carry links as [label](url).
// When anything here changes, update EFFECTIVE_DATE too.

export const EFFECTIVE_DATE = '27 October 2026';

export type Block = string | { list: string[] };

export interface LegalSection {
  id: string;
  heading: string;
  body: Block[];
}

export interface LegalDoc {
  kind: 'privacy' | 'terms';
  title: string;
  intro: string;
  summary: string[];
  sections: LegalSection[];
}

const YT_TERMS = 'https://www.youtube.com/t/terms';
const GOOGLE_PRIVACY = 'https://policies.google.com/privacy';
const GOOGLE_PERMISSIONS = 'https://security.google.com/settings/security/permissions';
const TIKTOK_TERMS = 'https://www.tiktok.com/legal/terms-of-service';
const TIKTOK_PRIVACY = 'https://www.tiktok.com/legal/privacy-policy';
const FONTS_PRIVACY = 'https://developers.google.com/fonts/faq/privacy';

export const PRIVACY: LegalDoc = {
  kind: 'privacy',
  title: 'Privacy Policy',
  intro:
    'Legends n Myths ("we", "us") makes short shadow-puppet videos of Asian and Southeast-Asian legends for children, publishes them on YouTube and TikTok, and runs this website. This policy explains what information is involved when you visit the website or watch our videos, and how the tools we use to publish our videos handle data.',
  summary: [
    'This website has no accounts, no sign-up forms, no comments, no advertising, no analytics and no cookies.',
    'We do not knowingly collect personal information from anyone, and especially not from children.',
    'Our publishing tool signs in only to our own YouTube channel and TikTok account, to upload our own videos. It never reads data about viewers.',
    'We never sell or share personal information.',
  ],
  sections: [
    {
      id: 'website',
      heading: 'When you visit this website',
      body: [
        'The website is a set of static pages. It does not ask for your name, email address or any other details, and it does not set cookies or store anything in your browser.',
        'Two services are involved in showing you the page:',
        {
          list: [
            'Our hosting provider, which, like every web server, may record standard technical logs (IP address, browser type, the page requested and the time) to deliver the site and keep it secure. These logs are handled under the host\'s own policy and are not used by us to identify anyone.',
            `Google Fonts, which supplies the typefaces. Your browser fetches the font files from Google, so Google receives your IP address and browser details. See [Google Fonts and privacy](${FONTS_PRIVACY}).`,
          ],
        },
      ],
    },
    {
      id: 'children',
      heading: "Children's privacy",
      body: [
        'Our videos are made for children, and this website is made to be safe for them. We do not knowingly collect, use or share personal information from children under 13 (or the equivalent minimum age in your country). There is nothing on the website for a child to fill in.',
        'If you are a parent or guardian and believe a child has sent us personal information, for example in a message, contact us and we will delete it.',
      ],
    },
    {
      id: 'platforms',
      heading: 'Watching our videos on YouTube and TikTok',
      body: [
        'Our videos are hosted by YouTube and TikTok. When you watch them there, those platforms collect information under their own policies, not this one: the [YouTube Terms of Service](' +
          YT_TERMS +
          '), the [Google Privacy Policy](' +
          GOOGLE_PRIVACY +
          ') and the [TikTok Privacy Policy](' +
          TIKTOK_PRIVACY +
          ').',
        'On YouTube our videos are marked "Made for Kids". YouTube then turns off comments, personalised advertising and some other features for those videos, to protect young viewers.',
        'TikTok is intended for people aged 13 and over. Younger children should watch our videos on YouTube or together with a grown-up.',
        'From both platforms we receive only aggregated statistics, such as the number of views, watch time and the countries viewers are in. These numbers do not tell us who anyone is.',
      ],
    },
    {
      id: 'publishing',
      heading: 'Our publishing tool (YouTube API Services and TikTok APIs)',
      body: [
        'We use our own software to upload our finished videos to our own YouTube channel and our own TikTok account. It is used only by Legends n Myths and is not offered to anyone else.',
        {
          list: [
            'It uses YouTube API Services and the TikTok Content Posting API, and signs in through Google and TikTok only to our own accounts.',
            'It uses that access only to upload our videos and set their title, description, tags, captions and privacy setting.',
            'It does not access, collect, store or share any information about viewers or any other users of YouTube or TikTok.',
            'The sign-in tokens it needs are kept privately by us, are used for nothing else, and are never sold or shared.',
          ],
        },
        `By using YouTube features you agree to the [YouTube Terms of Service](${YT_TERMS}); Google's handling of data is described in the [Google Privacy Policy](${GOOGLE_PRIVACY}). Access granted to the tool can be revoked at any time on the [Google security settings page](${GOOGLE_PERMISSIONS}) or in TikTok's app settings.`,
      ],
    },
    {
      id: 'messages',
      heading: 'If you contact us',
      body: [
        'If you write to us, we use your message and contact details only to reply to you, and we delete them when they are no longer needed for that.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Sharing and selling',
      body: ['We do not sell, rent or share personal information with anyone, and we do not use it for advertising.'],
    },
    {
      id: 'rights',
      heading: 'Your choices and rights',
      body: [
        'Depending on where you live, you may have the right to ask what personal information we hold about you, to have it corrected or deleted, or to object to how it is used. Because we do not collect personal information through the website, there is usually nothing to hand over, but we will always answer. Contact us using the details below.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      body: [
        'If we change this policy, we will update it on this page and change the effective date at the top. If a change affects how we handle information in an important way, we will also say so on our channels.',
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  kind: 'terms',
  title: 'Terms of Service',
  intro:
    'These terms apply to the Legends n Myths website and to the videos we publish on YouTube and TikTok. By using the website or watching our videos, you agree to them. If you are a child, please read them together with a grown-up.',
  summary: [
    'Watch, enjoy and share our videos using the platforms\' own share buttons.',
    'Teachers and parents may show our videos to children in classrooms, libraries and at home.',
    'Please do not re-upload, sell or edit our videos or artwork without asking us first.',
    'The legends are shared heritage; our retellings, puppets, narration and animation are our own work.',
  ],
  sections: [
    {
      id: 'who',
      heading: 'Who we are',
      body: [
        'Legends n Myths is a children\'s channel that retells Asian and Southeast-Asian legends as shadow-puppet animations. We publish on YouTube and TikTok and run this website.',
      ],
    },
    {
      id: 'content',
      heading: 'Our content and what you may do with it',
      body: [
        'The legends we tell belong to the cultures that keep them. Our scripts, narration, puppet designs, artwork, animation, sound design and this website are our own work and are protected by copyright.',
        'You may:',
        {
          list: [
            'watch our videos for personal, non-commercial enjoyment;',
            'share links to our videos, or share them with the YouTube and TikTok share and embed tools;',
            'show our videos to children for teaching, in classrooms, libraries, homeschooling or similar non-commercial settings.',
          ],
        },
        'Without our written permission, you may not:',
        {
          list: [
            'download and re-upload our videos, or publish edited, translated, dubbed or compiled versions of them;',
            'sell our videos, puppets or artwork, or use them in advertising or merchandise;',
            'present our work as your own or remove our name from it.',
          ],
        },
        'If you would like to use our work in another way, ask us: we are happy to hear from teachers, museums and storytellers.',
      ],
    },
    {
      id: 'platforms',
      heading: 'YouTube and TikTok',
      body: [
        `When you watch our videos on YouTube or TikTok, you are also using those services, and their own terms apply: the [YouTube Terms of Service](${YT_TERMS}) and the [TikTok Terms of Service](${TIKTOK_TERMS}). We do not control those platforms, their recommendations or the advertising they may show.`,
        'Our publishing tool, which uploads our own videos through YouTube API Services and the TikTok Content Posting API, is used only by Legends n Myths to manage our own accounts. It is not a service offered to the public, and these terms do not give anyone else access to it.',
      ],
    },
    {
      id: 'stories',
      heading: 'About the stories',
      body: [
        'Our videos are educational entertainment for children. Legends exist in many versions, and we simplify them and keep frightening moments gentle. The real-world places and facts we mention are checked with care, but the videos are not a historical or scientific record, and we may make mistakes. If you spot one, please tell us.',
      ],
    },
    {
      id: 'links',
      heading: 'Links to other websites',
      body: ['The website links to YouTube, TikTok and other sites we do not run. We are not responsible for their content or their privacy practices.'],
    },
    {
      id: 'warranty',
      heading: 'No warranty',
      body: [
        'We work hard to keep the website and our videos available and accurate, but we provide them "as is", without warranties of any kind, to the extent the law allows.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      body: [
        'To the extent the law allows, Legends n Myths is not liable for any indirect or consequential loss arising from use of the website or our videos. Nothing in these terms limits any rights you have that cannot be limited by law.',
      ],
    },
    {
      id: 'privacy',
      heading: 'Privacy',
      body: ['How we handle information is explained in our [Privacy Policy](../privacy/).'],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      body: [
        'We may update these terms from time to time. The effective date at the top always shows the latest version. If you keep using the website or watching our videos after a change, the updated terms apply.',
      ],
    },
  ],
};
