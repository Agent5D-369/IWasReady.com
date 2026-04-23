# IWasReady.com — UTM Convention Reference

## Purpose
Consistent UTM parameters let you answer:
"Which source, hook, creative, live, story, DM, or bio link produced the most
quiz starts, quiz completions, email captures, and downstream clicks?"

Every link you share should carry these parameters.
Use a URL builder or copy-paste from the examples below.

---

## Parameter Schema

| Parameter      | Role                               | Values (examples)           |
|----------------|------------------------------------|-----------------------------|
| utm_source     | Where the traffic came from        | instagram, facebook, tiktok, youtube, email, substack, partner |
| utm_medium     | Channel type                       | paid_social, organic_social, organic_live, story, dm, comment, bio, email, referral |
| utm_campaign   | Campaign name (date-keyed)         | freq_finder_apr2026, launch_wave1 |
| utm_content    | Specific hook or creative angle    | hook_youre_not_crazy, hook_whats_carrying_you, creative_quiz_cta_v1 |
| utm_id         | Unique creative/ad ID (optional)   | ad_001, reel_042 |

---

## Paid Social (Meta / TikTok)

These fire `paid_social` medium which activates Paid Traffic Mode on the quiz page
(simplified header, no cross-sell distractions until after opt-in).

```
utm_source=meta
utm_medium=paid_social
utm_campaign=freq_finder_apr2026
utm_content=hook_whats_carrying_you
utm_id=ad_001
```

```
utm_source=tiktok
utm_medium=paid_social
utm_campaign=freq_finder_apr2026
utm_content=hook_youre_not_crazy
utm_id=reel_042
```

**Full link example (Meta):**
```
https://iwasready.com/consciousness-quiz.html?utm_source=meta&utm_medium=paid_social&utm_campaign=freq_finder_apr2026&utm_content=hook_whats_carrying_you&utm_id=ad_001
```

---

## Instagram Organic

### Story link
```
utm_source=instagram&utm_medium=story&utm_campaign=freq_finder_apr2026&utm_content=story_quiz_cta
```

### Bio link
```
utm_source=instagram&utm_medium=bio&utm_campaign=freq_finder_apr2026&utm_content=bio_link
```

### Comment CTA (link in first comment or comment reply)
```
utm_source=instagram&utm_medium=comment&utm_campaign=freq_finder_apr2026&utm_content=comment_cta
```

### Organic post link (post caption or swipe-up)
```
utm_source=instagram&utm_medium=organic_social&utm_campaign=freq_finder_apr2026&utm_content=post_quiz_cta
```

---

## Instagram / Facebook Live

```
utm_source=instagram
utm_medium=organic_live
utm_campaign=freq_finder_apr2026
utm_content=live_qna_hook01
```

```
utm_source=facebook
utm_medium=organic_live
utm_campaign=freq_finder_apr2026
utm_content=live_qna_hook01
```

**Full link example (Instagram Live):**
```
https://iwasready.com/consciousness-quiz.html?utm_source=instagram&utm_medium=organic_live&utm_campaign=freq_finder_apr2026&utm_content=live_qna_hook01
```

---

## TikTok Organic

### Bio link
```
utm_source=tiktok&utm_medium=bio&utm_campaign=freq_finder_apr2026&utm_content=bio_link
```

### Video comment
```
utm_source=tiktok&utm_medium=comment&utm_campaign=freq_finder_apr2026&utm_content=comment_cta
```

---

## Direct Message / DM Replies

```
utm_source=instagram&utm_medium=dm&utm_campaign=freq_finder_apr2026&utm_content=dm_reply_quiz
```

```
utm_source=facebook&utm_medium=dm&utm_campaign=freq_finder_apr2026&utm_content=dm_reply_quiz
```

---

## Email / Substack

### Substack post
```
utm_source=substack&utm_medium=email&utm_campaign=freq_finder_apr2026&utm_content=post_quiz_cta
```

### Kit / ConvertKit email broadcast
```
utm_source=email&utm_medium=email&utm_campaign=freq_finder_apr2026&utm_content=broadcast_quiz_cta
```

---

## Guest Appearances / Partner Shares

```
utm_source=partner_name
utm_medium=referral
utm_campaign=freq_finder_apr2026
utm_content=guest_interview_title
```

---

## Text Blast / SMS

```
utm_source=sms&utm_medium=direct_message&utm_campaign=freq_finder_apr2026&utm_content=text_blast_01
```

---

## YouTube

### Video description link
```
utm_source=youtube&utm_medium=organic_social&utm_campaign=freq_finder_apr2026&utm_content=video_desc_quiz
```

### YouTube comment
```
utm_source=youtube&utm_medium=comment&utm_campaign=freq_finder_apr2026&utm_content=yt_comment_cta
```

---

## Paid Traffic Mode Shortcut

If you want to force simplified quiz mode without UTM tracking
(e.g., for a quick test link), append:
```
?lp=paid
```

---

## GA4 Custom Dimensions to Create

In GA4 > Configure > Custom Definitions, create these as "Event-scoped" dimensions:

| GA4 Dimension Name  | Event Parameter     | Notes                              |
|---------------------|---------------------|------------------------------------|
| Result Type         | result_type         | foundation, bridge-lower, etc.     |
| Quiz Name           | quiz_name           | frequency_finder, signal_activation |
| Landing Variant     | landing_variant     | paid, organic, etc.                |
| CTA Name            | cta_name            | start_quiz, submit_optin, etc.     |
| CTA Destination     | cta_destination     | Outbound URL                       |
| Hook Angle          | hook_angle          | Maps to utm_content                |
| Creative ID         | creative_id         | Maps to utm_id                     |
| Traffic Source      | traffic_source      | Maps to utm_source (first-touch)   |
| Traffic Medium      | traffic_medium      | Maps to utm_medium (first-touch)   |

---

## Core Events to Verify in GTM Preview

- `quiz_start` — fires when user clicks Begin the Quiz
- `quiz_question_view` — fires on each question render (param: quiz_step)
- `quiz_answer_select` — fires on each answer click (param: quiz_step, result_type preview)
- `quiz_back_click` — fires when user goes back
- `quiz_complete` — fires after last question answered
- `view_result` — fires when result screen renders (param: result_type, result_label)
- `form_start` — fires on first email input focus
- `form_submit` — fires on email form submit attempt
- `generate_lead` — fires on confirmed successful Kit subscription
- `cta_click` — fires on any [data-cta] element click
- `outbound_click` — fires on any external link click
- `audiobook_click` — fires on Hello Audio links
- `substack_click` — fires on Substack links
- `builders_path_click` — fires on stopthecollapse.com links
- `free_preview_click` — fires on book-preview.html links
- `result_share_click` — fires on share button click
- `trailer_play` / `trailer_milestone` / `trailer_complete` — video events on homepage

---
_Last updated: April 2026 | IWasReady.com_
