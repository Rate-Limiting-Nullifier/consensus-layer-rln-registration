<script lang="ts">
const Navbar = {};

export default Navbar;
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/images/eth-diamond-rainbow.png" height="24" alt="ETH2" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn" type="submit">Connect</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style>
.bg-dark {
  --bs-bg-opacity: 0 !important;
}
.navbar .container-fluid {
  --bs-gutter-x: 2rem;
}
</style>
