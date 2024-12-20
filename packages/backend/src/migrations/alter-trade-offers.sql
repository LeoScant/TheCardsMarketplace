-- First rename existing columns to match our needs
ALTER TABLE public.trade_offers 
  RENAME COLUMN user_id TO "from";

-- Add new columns
ALTER TABLE public.trade_offers 
  ADD COLUMN "to" INTEGER,
  ADD COLUMN card_from INTEGER,
  ADD COLUMN card_to INTEGER,
  ADD COLUMN status VARCHAR;

-- Add foreign key constraints
ALTER TABLE public.trade_offers
  ADD CONSTRAINT fk_trade_offers_from FOREIGN KEY ("from") REFERENCES public.users(id),
  ADD CONSTRAINT fk_trade_offers_to FOREIGN KEY ("to") REFERENCES public.users(id),
  ADD CONSTRAINT fk_trade_offers_card_from FOREIGN KEY (card_from) REFERENCES public.cards(id),
  ADD CONSTRAINT fk_trade_offers_card_to FOREIGN KEY (card_to) REFERENCES public.cards(id);
