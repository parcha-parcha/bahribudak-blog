"use client";

import { authPath } from "@/lib/auth";
import { resolveResourceAccessLevel } from "@/lib/resources";
import type {
  ResourceAccessLevel,
  ResourceArea,
  ResourceFormat,
  ResourceGroup,
  ResourceItem,
} from "@/lib/resources";
import { createClient } from "@/utils/supabase/client";
import type { ReactNode } from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

type Lang = "tr" | "en";
type FilterValue<T extends string> = "all" | T;
type SortValue = "catalog" | "title" | "format";

const accessOrder: ResourceAccessLevel[] = ["free", "member", "premiumSoon"];
const areaOrder: ResourceArea[] = ["orgu", "boya", "apre", "ortak"];
const groupOrder: ResourceGroup[] = [
  "training",
  "technical",
  "form",
  "checklist",
  "calculation",
  "management",
];
const formatOrder: ResourceFormat[] = ["PDF", "DOCX", "XLSX", "PPTX"];

const copy = {
  tr: {
    search: "Kaynaklarda ara",
    searchPlaceholder: "Başlık, açıklama, proses veya dosya türü ara…",
    clearSearch: "Aramayı temizle",
    processFilter: "Proses alanı",
    resourceFilter: "Kaynak türü",
    formatFilter: "Dosya biçimi",
    accessFilter: "Erişim",
    sortLabel: "Sıralama",
    sort: {
      catalog: "Katalog sırası",
      title: "Başlığa göre A–Z",
      format: "Dosya biçimine göre",
    },
    all: "Tümü",
    area: {
      orgu: "Örgü",
      boya: "Boya",
      apre: "Apre",
      ortak: "Ortak Teknik Yönetim",
    },
    group: {
      training: "Eğitim Notu",
      technical: "Teknik Doküman",
      form: "Proses Formu",
      checklist: "Kontrol Listesi",
      calculation: "Hesaplama Aracı",
      management: "Yönetim Dokümanı",
    },
    access: {
      free: "Ücretsiz",
      member: "Üyelikle",
      premiumSoon: "Ücretli aday",
    },
    accessHelp: {
      free: "Doğrudan indirilebilir kaynak.",
      member: "Giriş yapan üyeler için ayrılmış kaynak.",
      premiumSoon: "İleride ücretli paket olarak ayrılabilecek kaynak.",
    },
    resultSingle: "kaynak gösteriliyor",
    resultPlural: "kaynak gösteriliyor",
    activeFilters: "aktif filtre",
    download: "Dosyayı indir",
    memberDownload: "Üyelikle indir",
    signInToDownload: "Giriş yap / üyelikle indir",
    requestAccess: "Talep oluştur",
    version: "Sürüm",
    catalogDate: "Katalog kaydı",
    size: "Dosya boyutu",
    fileLanguage: "Dosya dili",
    language: {
      tr: "Türkçe",
      en: "İngilizce",
      "tr-en": "Türkçe / İngilizce",
    },
    status: "Durum",
    accessStatus: "Erişim",
    current: "Güncel",
    archive: "Arşiv",
    noResultTitle: "Seçilen filtrelerle eşleşen kaynak bulunamadı.",
    noResultText:
      "Arama metnini temizleyin veya filtrelerden birini “Tümü” konumuna alın.",
    clear: "Tüm filtreleri temizle",
    archiveNote:
      "“Arşiv” etiketi taşıyan dosyalar referans amaçlıdır; erişim etiketleri ise ücretli/üyelikli indirme altyapısı için katalog hazırlığıdır.",
  },
  en: {
    search: "Search resources",
    searchPlaceholder: "Search title, description, process or file type…",
    clearSearch: "Clear search",
    processFilter: "Process area",
    resourceFilter: "Resource type",
    formatFilter: "File format",
    accessFilter: "Access",
    sortLabel: "Sort",
    sort: {
      catalog: "Catalog order",
      title: "Title A–Z",
      format: "File format",
    },
    all: "All",
    area: {
      orgu: "Knitting",
      boya: "Dyeing",
      apre: "Finishing",
      ortak: "Cross-process Management",
    },
    group: {
      training: "Training Note",
      technical: "Technical Document",
      form: "Process Form",
      checklist: "Checklist",
      calculation: "Calculation Tool",
      management: "Management Document",
    },
    access: {
      free: "Free",
      member: "Member",
      premiumSoon: "Paid candidate",
    },
    accessHelp: {
      free: "Directly downloadable resource.",
      member: "Resource reserved for signed-in members.",
      premiumSoon: "Resource that can later become a paid package.",
    },
    resultSingle: "resource shown",
    resultPlural: "resources shown",
    activeFilters: "active filters",
    download: "Download file",
    memberDownload: "Member download",
    signInToDownload: "Sign in / member download",
    requestAccess: "Request access",
    version: "Version",
    catalogDate: "Cataloged",
    size: "File size",
    fileLanguage: "File language",
    language: {
      tr: "Turkish",
      en: "English",
      "tr-en": "Turkish / English",
    },
    status: "Status",
    accessStatus: "Access",
    current: "Current",
    archive: "Archive",
    noResultTitle: "No resources match the selected filters.",
    noResultText: "Clear the search text or set one of the filters to “All”.",
    clear: "Clear all filters",
    archiveNote:
      "Files marked “Archive” are for reference; access labels prepare the catalog for member and paid download infrastructure.",
  },
} as const;

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterButton({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2 ${
        active
          ? "border-[#0B2343] bg-[#0B2343] text-white shadow-sm"
          : "border-[#D8E0E8] bg-white text-[#0B2343]/[0.74] hover:border-[#2EA6D9] hover:text-[#0B2343]"
      }`}
    >
      <span>{children}</span>
      {typeof count === "number" ? (
        <span
          className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] ${
            active
              ? "bg-white/[0.14] text-white"
              : "bg-[#EEF3F7] text-[#0B2343]/[0.55]"
          }`}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

function isArchiveResource(item: ResourceItem) {
  return item.version.toLocaleLowerCase("tr-TR") === "arşiv";
}

export default function ResourceCenter({
  lang,
  resources,
}: {
  lang: Lang;
  resources: ResourceItem[];
}) {
  const t = copy[lang];
  const locale = lang === "tr" ? "tr-TR" : "en-US";
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [area, setArea] = useState<FilterValue<ResourceArea>>("all");
  const [group, setGroup] = useState<FilterValue<ResourceGroup>>("all");
  const [format, setFormat] = useState<FilterValue<ResourceFormat>>("all");
  const [access, setAccess] = useState<FilterValue<ResourceAccessLevel>>("all");
  const [sort, setSort] = useState<SortValue>("catalog");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active) setIsAuthenticated(Boolean(data.session));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const counts = useMemo(() => {
    const areaCounts = Object.fromEntries(
      areaOrder.map((item) => [
        item,
        resources.filter((resource) => resource.areas.includes(item)).length,
      ]),
    ) as Record<ResourceArea, number>;

    const groupCounts = Object.fromEntries(
      groupOrder.map((item) => [
        item,
        resources.filter((resource) => resource.group === item).length,
      ]),
    ) as Record<ResourceGroup, number>;

    const formatCounts = Object.fromEntries(
      formatOrder.map((item) => [
        item,
        resources.filter((resource) => resource.format === item).length,
      ]),
    ) as Record<ResourceFormat, number>;

    const accessCounts = Object.fromEntries(
      accessOrder.map((item) => [
        item,
        resources.filter((resource) => resolveResourceAccessLevel(resource) === item)
          .length,
      ]),
    ) as Record<ResourceAccessLevel, number>;

    return { areaCounts, groupCounts, formatCounts, accessCounts };
  }, [resources]);

  const filtered = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase(locale);

    const result = resources.filter((item) => {
      const matchesArea = area === "all" || item.areas.includes(area);
      const matchesGroup = group === "all" || item.group === group;
      const matchesFormat = format === "all" || item.format === format;
      const itemAccess = resolveResourceAccessLevel(item);
      const matchesAccess = access === "all" || itemAccess === access;
      const haystack = [
        item.title.tr,
        item.title.en,
        item.description.tr,
        item.description.en,
        item.format,
        item.version,
        item.size,
        ...item.areas.map((entry) => t.area[entry]),
        t.group[item.group],
        t.access[itemAccess],
      ]
        .join(" ")
        .toLocaleLowerCase(locale);
      const matchesQuery =
        !normalizedQuery || haystack.includes(normalizedQuery);

      return matchesArea && matchesGroup && matchesFormat && matchesAccess && matchesQuery;
    });

    if (sort === "title") {
      return [...result].sort((a, b) =>
        a.title[lang].localeCompare(b.title[lang], locale, {
          sensitivity: "base",
        }),
      );
    }

    if (sort === "format") {
      return [...result].sort((a, b) => {
        const formatDifference =
          formatOrder.indexOf(a.format) - formatOrder.indexOf(b.format);

        if (formatDifference !== 0) return formatDifference;

        return a.title[lang].localeCompare(b.title[lang], locale, {
          sensitivity: "base",
        });
      });
    }

    return result;
  }, [
    area,
    access,
    deferredQuery,
    format,
    group,
    lang,
    locale,
    resources,
    sort,
    t.area,
    t.access,
    t.group,
  ]);

  const activeFilterCount = [
    query.trim().length > 0,
    area !== "all",
    group !== "all",
    format !== "all",
    access !== "all",
    sort !== "catalog",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setQuery("");
    setArea("all");
    setGroup("all");
    setFormat("all");
    setAccess("all");
    setSort("catalog");
  };

  const resultLabel = filtered.length === 1 ? t.resultSingle : t.resultPlural;

  return (
    <div>
      <section className="rounded-[2rem] border border-[#D8E0E8] bg-white p-5 shadow-[0_14px_45px_rgba(11,35,67,0.06)] md:p-7">
        <div className="grid gap-7">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.65fr)] lg:items-end">
            <div>
              <label
                htmlFor="resource-search"
                className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/[0.55]"
              >
                {t.search}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#0B2343]/[0.42]">
                  <SearchIcon />
                </span>
                <input
                  id="resource-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="min-h-12 w-full rounded-2xl border border-[#D8E0E8] bg-[#F5F7FA] py-3 pl-12 pr-12 text-sm text-[#0B2343] outline-none transition placeholder:text-[#0B2343]/[0.38] focus:border-[#2EA6D9] focus:bg-white focus:ring-4 focus:ring-[#2EA6D9]/10"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label={t.clearSearch}
                    className="absolute inset-y-0 right-3 my-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#0B2343]/[0.48] transition hover:bg-[#EAF6FC] hover:text-[#0B2343] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9]"
                  >
                    ×
                  </button>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="resource-sort"
                className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/[0.55]"
              >
                {t.sortLabel}
              </label>
              <select
                id="resource-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortValue)}
                className="min-h-12 w-full rounded-2xl border border-[#D8E0E8] bg-[#F5F7FA] px-4 py-3 text-sm font-semibold text-[#0B2343] outline-none transition focus:border-[#2EA6D9] focus:bg-white focus:ring-4 focus:ring-[#2EA6D9]/10"
              >
                <option value="catalog">{t.sort.catalog}</option>
                <option value="title">{t.sort.title}</option>
                <option value="format">{t.sort.format}</option>
              </select>
            </div>
          </div>

          <div className="h-px bg-[#E4EAF0]" />

          <div className="grid gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/[0.55]">
                {t.processFilter}
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  active={area === "all"}
                  onClick={() => setArea("all")}
                  count={resources.length}
                >
                  {t.all}
                </FilterButton>
                {areaOrder.map((item) => (
                  <FilterButton
                    key={item}
                    active={area === item}
                    onClick={() => setArea(item)}
                    count={counts.areaCounts[item]}
                  >
                    {t.area[item]}
                  </FilterButton>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.45fr_0.55fr]">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/[0.55]">
                  {t.resourceFilter}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={group === "all"}
                    onClick={() => setGroup("all")}
                    count={resources.length}
                  >
                    {t.all}
                  </FilterButton>
                  {groupOrder.map((item) => (
                    <FilterButton
                      key={item}
                      active={group === item}
                      onClick={() => setGroup(item)}
                      count={counts.groupCounts[item]}
                    >
                      {t.group[item]}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/[0.55]">
                  {t.formatFilter}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={format === "all"}
                    onClick={() => setFormat("all")}
                    count={resources.length}
                  >
                    {t.all}
                  </FilterButton>
                  {formatOrder.map((item) => (
                    <FilterButton
                      key={item}
                      active={format === item}
                      onClick={() => setFormat(item)}
                      count={counts.formatCounts[item]}
                    >
                      {item}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#0B2343]/[0.55]">
                  {t.accessFilter}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    active={access === "all"}
                    onClick={() => setAccess("all")}
                    count={resources.length}
                  >
                    {t.all}
                  </FilterButton>
                  {accessOrder.map((item) => (
                    <FilterButton
                      key={item}
                      active={access === item}
                      onClick={() => setAccess(item)}
                      count={counts.accessCounts[item]}
                    >
                      {t.access[item]}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p
            aria-live="polite"
            className="text-sm font-semibold text-[#0B2343]/[0.7]"
          >
            <span className="font-black text-[#0B2343]">{filtered.length}</span>{" "}
            {resultLabel}
          </p>

          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center rounded-full bg-[#EAF6FC] px-3 py-1.5 text-xs font-bold text-[#177DA8] transition hover:bg-[#D9EFF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9]"
            >
              {activeFilterCount} {t.activeFilters} · {t.clear}
            </button>
          ) : null}
        </div>

        <p className="max-w-2xl text-xs leading-5 text-[#0B2343]/[0.55]">
          {t.archiveNote}
        </p>
      </div>

      {filtered.length > 0 ? (
        <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, index) => {
            const archived = isArchiveResource(item);
            const accessLevel = resolveResourceAccessLevel(item);

            return (
              <article
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#D8E0E8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2EA6D9]/50 hover:shadow-[0_20px_55px_rgba(11,35,67,0.1)]"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#E7ECF1] bg-[#F8FAFC] px-6 py-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black tracking-[0.14em] text-[#0B2343]/[0.38]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[#EAF6FC] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#0B2343]">
                      {t.group[item.group]}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#2EA6D9]/30 bg-white px-3 py-1.5 text-[10px] font-black tracking-[0.12em] text-[#238DBB]">
                    {item.format}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.areas.map((entry) => (
                      <span
                        key={entry}
                        className="rounded-full border border-[#DDE5EC] px-3 py-1 text-[10px] font-bold text-[#0B2343]/[0.64]"
                      >
                        {t.area[entry]}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold leading-snug tracking-[-0.02em] text-[#0B2343]">
                    {item.title[lang]}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#0B2343]/[0.68]">
                    {item.description[lang]}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[#E2E8EE] pt-5 text-xs">
                    <div>
                      <dt className="font-semibold text-[#0B2343]/[0.45]">
                        {t.version}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {archived ? t.archive : item.version}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0B2343]/[0.45]">
                        {t.catalogDate}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {item.catalogDate}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0B2343]/[0.45]">
                        {t.size}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {item.size}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[#0B2343]/[0.45]">
                        {t.fileLanguage}
                      </dt>
                      <dd className="mt-1 font-bold text-[#0B2343]">
                        {t.language[item.fileLanguage]}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold text-[#0B2343]/[0.45]">
                        {t.status}
                      </dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${
                            archived
                              ? "bg-[#FFF3E8] text-[#9A4E0B]"
                              : "bg-[#EAF7EF] text-[#247342]"
                          }`}
                        >
                          {archived ? t.archive : t.current}
                        </span>
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold text-[#0B2343]/[0.45]">
                        {t.accessStatus}
                      </dt>
                      <dd className="mt-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${
                            accessLevel === "free"
                              ? "bg-[#EAF7EF] text-[#247342]"
                              : accessLevel === "member"
                                ? "bg-[#EAF6FC] text-[#177DA8]"
                                : "bg-[#FFF8E1] text-[#8A6400]"
                          }`}
                        >
                          {t.access[accessLevel]}
                        </span>
                        <span className="text-[11px] leading-5 text-[#0B2343]/[0.55]">
                          {t.accessHelp[accessLevel]}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6">
                    {accessLevel === "premiumSoon" ? (
                      <a
                        href={`/${lang}/contact`}
                        aria-label={`${t.requestAccess}: ${item.title[lang]} (${item.format})`}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#8A6400] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#A47700] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] focus-visible:ring-offset-2"
                      >
                        {t.requestAccess} · {item.format}
                      </a>
                    ) : accessLevel === "member" && !isAuthenticated ? (
                      <a
                        href={`${authPath(lang, "login")}?next=${encodeURIComponent(item.href)}`}
                        aria-label={`${t.signInToDownload}: ${item.title[lang]} (${item.format})`}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#238DBB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2"
                      >
                        {t.signInToDownload} · {item.format}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        download
                        aria-label={`${t.download}: ${item.title[lang]} (${item.format})`}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#238DBB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2"
                      >
                        <DownloadIcon />
                        {accessLevel === "member" ? t.memberDownload : t.download} · {item.format}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="mt-6 rounded-[2rem] border border-dashed border-[#2EA6D9]/45 bg-[#EAF6FC]/60 px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#238DBB] shadow-sm">
            <SearchIcon />
          </div>
          <h2 className="mt-5 text-xl font-bold text-[#0B2343]">
            {t.noResultTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#0B2343]/[0.65]">
            {t.noResultText}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-[#0B2343] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#238DBB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2EA6D9] focus-visible:ring-offset-2"
          >
            {t.clear}
          </button>
        </section>
      )}
    </div>
  );
}
