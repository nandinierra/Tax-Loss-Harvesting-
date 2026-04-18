import { useMemo } from 'react';
import { capitalGainsAPI } from '../data/capitalGains';

// Simple high precision math helper to avoid floating point precision loss with micro-values
const scale = (val) => BigInt(Math.round(val * 1e18));
const unscale = (val) => Number(val) / 1e18;

export const useTaxCalculations = (holdings) => {
  const calculations = useMemo(() => {
    // 1. BASELINE VALUES
    const baseStats = capitalGainsAPI;

    // Fixed-point scaling
    const preStProfits = scale(baseStats.stcg.profits);
    const preStLosses = scale(baseStats.stcg.losses);
    const preLtProfits = scale(baseStats.ltcg.profits);
    const preLtLosses = scale(baseStats.ltcg.losses);

    const preNetST = preStProfits - preStLosses;
    const preNetLT = preLtProfits - preLtLosses;
    const preTotalBig = preNetST + preNetLT;

    const preHarvest = {
      st: { 
        profits: baseStats.stcg.profits, 
        losses: -baseStats.stcg.losses, 
        net: unscale(preNetST) 
      },
      lt: { 
        profits: baseStats.ltcg.profits, 
        losses: -baseStats.ltcg.losses, 
        net: unscale(preNetLT) 
      },
      total: unscale(preTotalBig)
    };

    // 2. HARVESTING LOGIC
    let extraStProfits = BigInt(0);
    let extraStLosses = BigInt(0);
    let extraLtProfits = BigInt(0);
    let extraLtLosses = BigInt(0);

    holdings.forEach(h => {
      if (h.selected) {
        if (h.stGain > 0) {
          extraStProfits += scale(h.stGain);
        } else if (h.stGain < 0) {
          extraStLosses += scale(Math.abs(h.stGain));
        }

        if (h.ltGain > 0) {
          extraLtProfits += scale(h.ltGain);
        } else if (h.ltGain < 0) {
          extraLtLosses += scale(Math.abs(h.ltGain));
        }
      }
    });

    const updatedStProfits = preStProfits + extraStProfits;
    const updatedStLosses = preStLosses + extraStLosses;
    const updatedLtProfits = preLtProfits + extraLtProfits;
    const updatedLtLosses = preLtLosses + extraLtLosses;

    const postNetST = updatedStProfits - updatedStLosses;
    const postNetLT = updatedLtProfits - updatedLtLosses;
    const postTotalBig = postNetST + postNetLT;

    const postHarvest = {
      st: { 
        profits: unscale(updatedStProfits), 
        losses: -unscale(updatedStLosses), 
        net: unscale(postNetST) 
      },
      lt: { 
        profits: unscale(updatedLtProfits), 
        losses: -unscale(updatedLtLosses), 
        net: unscale(postNetLT) 
      },
      total: unscale(postTotalBig)
    };

    // 3. SAVINGS CALCULATION
    const reduction = unscale(preTotalBig - postTotalBig);
    // Use a very small epsilon for micro-value detection
    const hasReduction = reduction > 1e-18; 

    return { preHarvest, postHarvest, reduction, hasReduction };
  }, [holdings]);

  return calculations;
};
