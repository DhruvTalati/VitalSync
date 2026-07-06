import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { _id: true }
);

const billSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true
    },
    consultationFee: {
      type: Number,
      default: 0
    },
    medicineFee: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid'
    },
    billDate: {
      type: Date,
      default: Date.now
    }
  },
  { _id: true }
);

const walletSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    balance: {
      type: Number,
      default: 0
    },
    transactions: [transactionSchema],
    bills: [billSchema]
  },
  { timestamps: true }
);

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;