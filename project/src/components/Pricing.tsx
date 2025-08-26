import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2 className="section-title">💼 Recommended Pricing for a New Startup</h2>
        
        <div className="pricing-content">
          <div className="pricing-section">
            <h3>A. Flat Rate per Design</h3>
            <ul>
              <li>Simple design (left-chest logo or cap, up to ~10k stitches): <strong>$10–$12 flat</strong></li>
              <li>Medium complexity (moderate detail, medium size): <strong>$15–$20 flat</strong></li>
              <li>Complex or large design (jacket back, patch with many colors): <strong>$25–$35+ flat</strong></li>
            </ul>
          </div>

          <div className="pricing-section">
            <h3>B. Pay-Per-Stitch Pricing</h3>
            <p><strong>$0.75–$1.50 per 1,000 stitches</strong> (minimum $8–$10 per design)</p>
            <div className="examples">
              <p>Example: 8,000 stitches × $1.00 = $8</p>
              <p>Example: 20,000 stitches × $1.25 = $25</p>
            </div>
          </div>

          <div className="pricing-section">
            <h3>C. Rush Orders</h3>
            <p>Add <strong>$5–$10 per design</strong> for 4-hour or same-day delivery</p>
          </div>

          <div className="pricing-section">
            <h3>D. Additional Services</h3>
            <ul>
              <li>Resizing or minor edits: <strong>Free or up to $2</strong></li>
              <li>Sew-out proof image: <strong>$2 per design</strong></li>
            </ul>
          </div>

          <div className="pricing-table-section">
            <h3>✅ Quick Comparison Table</h3>
            <div className="table-container">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Service Type</th>
                    <th>Flat Rate (USD)</th>
                    <th>Per-Stitch Option</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Simple design</td>
                    <td>$10–12</td>
                    <td>$0.75–$1.00, min $8</td>
                    <td>Caps/left chest logos</td>
                  </tr>
                  <tr>
                    <td>Medium design</td>
                    <td>$15–20</td>
                    <td>$1.00–$1.25</td>
                    <td>Moderate detail & size</td>
                  </tr>
                  <tr>
                    <td>Complex design</td>
                    <td>$25–35+</td>
                    <td>$1.25–$1.50</td>
                    <td>Large/detailed patches/logos</td>
                  </tr>
                  <tr>
                    <td>Rush order</td>
                    <td>+$5–10</td>
                    <td>N/A</td>
                    <td>Faster turnaround</td>
                  </tr>
                  <tr>
                    <td>Edits/resizing</td>
                    <td>Free or +$2</td>
                    <td>—</td>
                    <td>Minor adjustments</td>
                  </tr>
                  <tr>
                    <td>Proof/sew-out img</td>
                    <td>+$2</td>
                    <td>—</td>
                    <td>Shows final result</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;