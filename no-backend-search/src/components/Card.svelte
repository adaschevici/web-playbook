<script lang="ts">
  export let href: string;
  export let title: string;
  export let body: string;
</script>

<li class="link-card p-p1 flex rounded-lg bg-light-grey-custom dark:bg-dark-grey-custom">
  <a
    {href}
    class="
    p6
    w-full
    rounded-lg
    border
    border-gray-300
    bg-light-grey-custom
    px-[calc(1.5rem-1px)]
    py-[calc(1.5rem-1px)]
    leading-normal
    text-dark-grey-custom
    no-underline
    opacity-80 shadow-sm
    dark:bg-dark-grey-custom
    dark:text-gray-100"
  >
    <h2>
      {title}
      <span>&rarr;</span>
    </h2>
    <p>
      {body}
    </p>
  </a>
</li>

<style>
  .link-card {
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow:
      0 1px 3px rgb(0 0 0 / 12%),
      0 1px 2px rgb(0 0 0 / 24%);
  }
  .link-card > a {
    width: 100%;
    line-height: 1.4;
    padding: calc(1.5rem - 1px);
    border-radius: 8px;
    opacity: 0.8;
  }
  h2 {
    margin: 0;
    font-size: 1.25rem;
    transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
  .link-card:is(:hover, :focus-within) {
    background-position: 0;
    background-image: var(--accent-gradient);
  }
  .link-card:is(:hover, :focus-within) h2 {
    color: rgb(var(--accent-light));
  }
</style>
