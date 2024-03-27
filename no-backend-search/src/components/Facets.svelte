<script>
  import { facets } from '../stores/facets.ts';

  export let visible = false;

  function handleSelect(e, aggregation) {
    console.log(aggregation);
  }
</script>

<div class="mt-16 max-w-xs filter {visible ? 'invisible' : ''}">
  <h1>Legislative frameworks</h1>
  <div id="language-filter" class="container">
    {#each $facets as aggregation (aggregation._key)}
      {#if aggregation._key}
        <label class="filter__input">
          <input
            type="checkbox"
            on:click={(e) => handleSelect(e, aggregation)}
            class="filter__check"
            name={aggregation._name}
            value={aggregation._key}
          />
          <span class="text">{aggregation._key}</span>
          <span class="doc_count">{aggregation._doc_count}</span>
        </label>
      {/if}
    {/each}
  </div>
</div>

<style>
  .filter {
    width: 100%;
    box-shadow:
      0 1px 3px rgb(0 0 0 / 12%),
      0 1px 2px rgb(0 0 0 / 24%);
    border-radius: 6px;
    overflow: hidden;
    padding: 1rem;
  }
  .filter__check {
    position: relative;
    width: min-content;
    margin: 0.5rem;
  }
  .text {
    flex: 1;
  }
  .filter__input {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }
  .doc_count {
    justify-self: flex-end;
    color: #9d9d9d;
  }
  .filter h1 {
    display: flex;
    box-sizing: border-box;
    padding: 16px;
    align-items: center;
    font-family: Roboto, 'Helvetica Neue', sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: rgb(10 10 34);
    margin: 0;
    height: 48px;
    line-height: 16px;
    margin-top: -8px;
    padding-left: 7px;
  }
</style>
