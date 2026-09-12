import React, { useState } from "react";
import { CopyButton } from "./CopyButton";
import { ExternalIcon } from "./Icons";
import { siteConfig } from "../config";

export function DonateSection() {
  const [selectedWalletId, setSelectedWalletId] = useState("btc");
  const [networkIndices, setNetworkIndices] = useState({});

  const activeWallet =
    siteConfig.cryptoWallets.find((w) => w.id === selectedWalletId) ||
    siteConfig.cryptoWallets[0];

  const currentNetworkIndex = networkIndices[activeWallet.id] || 0;
  const currentNetwork =
    activeWallet.networks[currentNetworkIndex] || activeWallet.networks[0];

  const handleNetworkChange = (walletId, index) => {
    setNetworkIndices((prev) => ({ ...prev, [walletId]: index }));
  };

  return (
    <section className="section">
      <div className="shell stack-lg">
        {/* Header */}
        <div className="stack-sm">
          <div className="hero-tagline-badge">
            <span>VAULT & COMMUNITY SUPPORT</span>
          </div>

          <h1 className="h1">Support {siteConfig.name} Engine</h1>
          <p className="lede">
            Our mission is keeping all scripts 100% free with zero keys, zero linkvertise,
            and direct updates. Donations help fund server hosting, reverse engineering,
            and bypass research.
          </p>
        </div>

        {/* Crypto Vault */}
        <div className="stack">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
            <h2 className="h2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🔐 Crypto Vault</span>
            </h2>
            <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--cyan)" }}>
              Direct & Anonymous
            </span>
          </div>

          {/* Wallet Selector Pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {siteConfig.cryptoWallets.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                className={`btn ${selectedWalletId === wallet.id ? "btn-primary" : "btn-raised"}`}
                onClick={() => setSelectedWalletId(wallet.id)}
              >
                {wallet.name} ({wallet.ticker})
              </button>
            ))}
          </div>

          {/* Active Vault Card */}
          <div
            style={{
              background: "var(--bg-panel)",
              border: "1px solid var(--cyan-border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              display: "grid",
              gap: "20px",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 242, 254, 0.08)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {activeWallet.name} ({activeWallet.ticker})
                </h3>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Send only {activeWallet.ticker} to this deposit address
                </span>
              </div>

              {activeWallet.networks.length > 1 && (
                <div style={{ display: "flex", gap: "6px" }}>
                  {activeWallet.networks.map((net, idx) => (
                    <button
                      key={net.id}
                      type="button"
                      className="btn btn-sm"
                      style={{
                        borderColor: idx === currentNetworkIndex ? "var(--cyan)" : "var(--border-subtle)",
                        color: idx === currentNetworkIndex ? "var(--cyan)" : "var(--text-secondary)",
                        background: idx === currentNetworkIndex ? "var(--cyan-soft)" : "transparent"
                      }}
                      onClick={() => handleNetworkChange(activeWallet.id, idx)}
                    >
                      {net.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Address Field */}
            <div
              style={{
                background: "var(--bg-dark)",
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap"
              }}
            >
              <code
                style={{
                  wordBreak: "break-all",
                  color: "var(--cyan)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13.5px"
                }}
              >
                {currentNetwork.address}
              </code>

              <CopyButton
                value={currentNetwork.address}
                label="Copy Address"
                done="Copied!"
                className="btn btn-primary btn-sm"
              />
            </div>

            <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
              Network Protocol: <strong style={{ color: "var(--text-primary)" }}>{currentNetwork.label}</strong>
            </div>
          </div>
        </div>

        {/* Traditional Payment Cards */}
        <div className="stack">
          <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px" }}>
            <h2 className="h2">Other Support Methods</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px"
            }}
          >
            {siteConfig.paymentMethods.map((method) => (
              <div
                key={method.id}
                style={{
                  background: "var(--bg-panel)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-primary)" }}>
                    {method.name}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {method.handle}
                  </div>
                </div>

                <a
                  className="btn btn-raised btn-sm"
                  href={method.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Send
                  <ExternalIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
