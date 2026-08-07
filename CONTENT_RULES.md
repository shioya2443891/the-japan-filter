# Content Rules — The Japan Filter

These rules apply to all articles, page copy, and layout text across the site.
They exist to prevent FTC compliance issues, Amazon Associates policy violations,
and reader trust problems that arise from overclaiming firsthand experience.

---

## 1. Never imply physical product testing

The Japan Filter does not purchase or physically test products.
Do not use any language that implies direct, hands-on experience.

**Prohibited expressions:**
- tested / we tested / after testing
- hands-on / hands-on review
- we tried / we used / we bought
- in our testing / during our testing
- after using / after receiving
- unboxed / in person (when describing product feel)

**Use instead:**
- we researched / we evaluated
- reviewers report / reviewers consistently describe
- according to manufacturer specifications
- verified listings show / based on official product information
- customer reviews indicate

**Examples:**

| Before (prohibited) | After (correct) |
|---|---|
| "We tested this in the dishwasher" | "Reviewers consistently report dishwasher performance holds up after 12+ months" |
| "Dishwasher performance holds up well" | "Reviewers report dishwasher performance holds up well" |
| "We found the glaze durable" | "Customer reviews indicate the glaze remains durable over time" |
| "In our testing, the handle felt secure" | "Reviewers describe the handle as secure" |

---

## 2. Do not use ambiguous first-person plural for physical claims

"We" is acceptable when referring to research and verification work.
"We" is not acceptable when the sentence implies physical interaction with a product.

**Acceptable:**
- "We verified the seller is Noritake U.S.A., Inc."
- "We cross-referenced domestic Japanese rankings."
- "We evaluated availability across Amazon.com listings."

**Not acceptable:**
- "We found the weight comfortable." → "Reviewers describe the weight as comfortable."
- "We noticed the glaze fades." → "Some reviewers report glaze fading over time."

---

## 3. Avoid specific, volatile review metrics

Review counts, star ratings, and sales rank fluctuate daily.
Do not hardcode specific numbers that will become inaccurate and undermine credibility.

**Prohibited:**
- "4.7 stars across 2,340 reviews"
- "Amazon's #1 bestseller in Dinnerware"
- "ranked #3 in customer satisfaction"

**Use instead:**
- "consistently well-reviewed (4★ and above)"
- "one of the highest-rated sets in its category"
- "a strong review record with 100+ verified purchases"

Once the Amazon Product Advertising API (Creators API) is integrated, dynamic
review counts and ratings can be fetched and displayed programmatically.
Until then, use range or threshold descriptions only.

---

## 4. Sourcing language in How We Researched sections

Each `researchSteps` entry must describe an action taken on available information —
not physical verification. Acceptable verbs: confirmed, verified, cross-referenced,
checked, reviewed, evaluated, compared.

Avoid: tested, examined in person, assessed by hand, inspected.

---

## 5. Layout and evergreen copy

Site-wide copy in BaseLayout, about.astro, and index.astro must use research-based
framing. Approved phrasing for evergreen mission statements:

- "We research and verify Japanese products using domestic market information
  and manufacturer sources."
- "Independent research and verification — not physical testing."
- "Re-evaluated using domestic Japanese sources, not firsthand product use."

---

## 6. Master Article Template

The Noritake Colorwave wedding gifts article (`best-noritake-dinnerware-wedding-gifts.md`)
is the confirmed master template for all Japan Filter articles.

**Standard article structure (in order):**

1. **INTRO** — frontmatter `intro` field; one paragraph establishing the brand and why
   it matters for US buyers
2. **Product Cards** — frontmatter `products` array; rendered automatically by ArticleLayout
3. **Editorial body** — markdown content in the article file; supplemental context,
   use cases, buying scenarios
4. **Japan Context** — frontmatter `japanContext`; two required subsections:
   - **IN JAPAN**: documented facts about how the product/brand is positioned, sold,
     or priced in the Japanese market, with verification date for any time-sensitive data
   - **WHAT THAT MEANS FOR U.S. BUYERS**: explicit translation of each Japan-market fact
     into a concrete US buyer implication
5. **What US Buyers Should Know** — frontmatter `usBuyerNotes`; practical checklist
   items specific to buying this product category as a US consumer
6. **Final Verdict** — frontmatter `verdict`; rating, summary, and best pick with
   Amazon CTA
7. **How We Researched** — frontmatter `researchSteps`, `sourcesChecked`,
   `lastVerified`; methodology transparency

New articles must follow this structure. Deviating from the order or omitting sections
requires documented justification.

---

## 7. Japan Context: prohibited reasoning patterns

The Japan Context section exists to provide verifiable market intelligence — not to
validate a purchase recommendation on the basis of popularity or cultural prestige.

**Prohibited logic:**

- "This product is popular in Japan, therefore it is good" — Japanese market popularity
  does not transfer as product quality evidence for US buyers
- "Japanese consumers prefer X, so US buyers should too" — preference differences between
  markets are real; domestic Japanese preference is not a recommendation signal
- "It sells well in Japan" — sales performance in one market does not indicate product
  fit or value in another
- Using the brand's Japanese origin as a standalone quality signal without specific,
  verifiable evidence

**The Japan Context section must:**
- State verifiable facts about how the product is positioned, priced, or distributed
  in Japan
- Explicitly connect each Japan-market fact to a US buyer implication in the
  "WHAT THAT MEANS FOR U.S. BUYERS" subsection
- Include verification date for any market data (prices, availability, rankings)
- Remain neutral: Japan-market context can support, qualify, or contradict a recommendation

**Japan Context must never substitute for a verdict.** The Final Verdict section carries
the recommendation; Japan Context provides supporting or qualifying evidence only.
